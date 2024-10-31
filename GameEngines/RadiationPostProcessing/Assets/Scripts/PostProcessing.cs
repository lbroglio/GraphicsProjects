using System;
using System.Collections;
using System.Collections.Generic;
using JetBrains.Annotations;
using UnityEditor.PackageManager.UI;
using UnityEngine;

public class PostProcessing : MonoBehaviour
{

    ComputeBuffer radSourcesBuffer;

    // Config Values
    public float Intensity = 0.3f;
    public float MaximumEffectRadius = 5;

    Material radiationEffectShader;

    // Start is called before the first frame update
    void Start()
    {
        // Add all radiation sources to buffer on the GPU
        RadiationSource[] sourceObjects = FindObjectsOfType<RadiationSource>();
        
        // Get struct rep for all sources
        RadiationSource.PassableRadiationSource[] sourcesList = 
            new RadiationSource.PassableRadiationSource[sourceObjects.Length];
        for(int i =0; i < sourceObjects.Length; i++){
           sourcesList[i] = sourceObjects[i].GetPassableRep();
        }
        radSourcesBuffer = new ComputeBuffer(sourcesList.Length, sizeof(float) * 5);
        radSourcesBuffer.SetData(sourcesList);

        // Set setting values
        radiationEffectShader = Resources.Load("Materials/RadiationDistortion") as Material;

        // Set config values
        radiationEffectShader.SetFloat("intensity", Intensity);
        radiationEffectShader.SetFloat("maximumEffectRadius", MaximumEffectRadius);
        radiationEffectShader.SetInt("screenWidth", Screen.width);    

        // Set radiation source values
        radiationEffectShader.SetBuffer("radiationSources", radSourcesBuffer);
        radiationEffectShader.SetInt("numSources", sourcesList.Length);    


    }

    // Update is called once per frame
    void Update()
    {
        // Update player position 
        GameObject player = GameObject.Find("Main Camera");
        Vector3 v = player.transform.position;
        radiationEffectShader.SetVector("playerPos", new Vector4(v.x, v.y, v.z, 1));
    }


    void OnRenderImage(RenderTexture source, RenderTexture destination){

        Graphics.Blit(source, destination, radiationEffectShader);
    }

    void OnDestroy(){
        radSourcesBuffer.Release();
    }
}
