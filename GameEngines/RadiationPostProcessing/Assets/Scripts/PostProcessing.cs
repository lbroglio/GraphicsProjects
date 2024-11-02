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

    private float frameNum  = 0;

     RadiationSource.PassableRadiationSource[] sourcesList;

    // Start is called before the first frame update
    void Start()
    {
        // Add all radiation sources to buffer on the GPU
        RadiationSource[] sourceObjects = FindObjectsOfType<RadiationSource>();
        
        // Get struct rep for all sources
        sourcesList = new RadiationSource.PassableRadiationSource[sourceObjects.Length];
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

        // Set new position for all radiatiomn sources
        RadiationSource[] sourceObjects = FindObjectsOfType<RadiationSource>();
        for(int i =0; i < sourceObjects.Length; i++){
           sourcesList[i].pos = sourceObjects[i].transform.position;
        }
        radSourcesBuffer.SetData(sourcesList);


        // Update the frame 
        frameNum = (frameNum + 1) % 10000;
        radiationEffectShader.SetFloat("frameNum", frameNum);
    }


    void OnRenderImage(RenderTexture source, RenderTexture destination){

        Graphics.Blit(source, destination, radiationEffectShader);
    }

    void OnDestroy(){
        radSourcesBuffer.Release();
    }
}
