using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PostProcessing : MonoBehaviour
{

    struct BoundingBox {
        public Vector3 minimal;
        public Vector3 maximal;
    };

    // Compute buffer which stores the sources of radiation
    ComputeBuffer radSourcesBuffer;

    // Compute buffer which stores the bounding boxes of the scene geometry
    ComputeBuffer sceneGeoBuffer;
    private int numSceneObjs;

    // Buffer which stores the amount of material between a radiation source and the player
    ComputeBuffer sourcePlayerBlockBuffer;

    public ComputeShader BlockAmtCalcShader;

    // Config Values
    public float Intensity = 0.3f;
    public float MaximumEffectRadius = 5;

    Material radiationEffectShader;

    private float frameNum  = 0;

    // Saved list of radiation sources
    RadiationSource.PassableRadiationSource[] sourcesList;

    // Remake/Resize and fill the radSources compute buffer
    private void FillRadiationSourcesBuffer(){
        // Release rad sources buffer if necessary
        radSourcesBuffer?.Release();


        RadiationSource[] sourceObjects = FindObjectsOfType<RadiationSource>();
        
        // Get struct rep for all sources
        sourcesList = new RadiationSource.PassableRadiationSource[sourceObjects.Length];
        for(int i =0; i < sourceObjects.Length; i++){
           sourcesList[i] = sourceObjects[i].GetPassableRep();
        }
        radSourcesBuffer = new ComputeBuffer(sourcesList.Length, sizeof(float) * 5);
        radSourcesBuffer.SetData(sourcesList);

        // Set relevant values in the shader
        radiationEffectShader.SetBuffer("radiationSources", radSourcesBuffer);
        radiationEffectShader.SetInt("numSources", sourcesList.Length);

        // Remake block buffer to match potentially changed size
        sourcePlayerBlockBuffer?.Release();
        sourcePlayerBlockBuffer = new ComputeBuffer(sourcesList.Length, sizeof(float));
        radiationEffectShader.SetBuffer("sourcePlayerBlock", sourcePlayerBlockBuffer);
    }

    // Called to remake radiation sources buffer when a new radiation source is spawned
    public void AddRadiationSource(){
        FillRadiationSourcesBuffer();
    }
    

    // Start is called before the first frame update
    void Start()
    {
        // Add bounding boxes of scene geometry to a ComputeBuffer
        GameObject[] sceneGeo = GameObject.FindGameObjectsWithTag("WorldGeometry");
        List<BoundingBox>  boundingBoxList = new List<BoundingBox>();
        foreach(GameObject geoObj in sceneGeo){
            // Create bounding box struct for this 
            BoundingBox bb;
            bb.minimal = geoObj.GetComponent<Collider>().bounds.min;
            bb.maximal = geoObj.GetComponent<Collider>().bounds.max;
            boundingBoxList.Add(bb);

        }

        
        // Setup compute buffer to hold scene geometry bounding boxes
        sceneGeoBuffer = new ComputeBuffer(boundingBoxList.Count, sizeof(float) * 9);
        sceneGeoBuffer.SetData(boundingBoxList.ToArray());

        // Set config values
        radiationEffectShader = Resources.Load("Materials/RadiationDistortion") as Material;

        // Set config values
        radiationEffectShader.SetFloat("intensity", Intensity);
        radiationEffectShader.SetFloat("maximumEffectRadius", MaximumEffectRadius);
        radiationEffectShader.SetInt("screenWidth", Screen.width);    

        // Add all radiation sources to buffer on the GPU
        FillRadiationSourcesBuffer();

    }

    // Update is called once per frame
    void Update()
    {
        // Update player position 
        GameObject player = GameObject.Find("Main Camera");
        Vector3 v = player.transform.position;
        radiationEffectShader.SetVector("playerPos", new Vector4(v.x, v.y, v.z, 1));

        // Update position for all radiation sources
        RadiationSource[] sourceObjects = FindObjectsOfType<RadiationSource>();
        for(int i =0; i < sourceObjects.Length; i++){
           sourcesList[i].pos = sourceObjects[i].transform.position;
        }
        radSourcesBuffer.SetData(sourcesList);


        // Update the frame count
        frameNum = (frameNum + 1) % 10000;
        radiationEffectShader.SetFloat("frameNum", frameNum);
    }


    void OnRenderImage(RenderTexture source, RenderTexture destination){
        // Dispatch compute shader to calculate the amount of the material between radiation source and player
        int kernel = BlockAmtCalcShader.FindKernel("CSMain");
        // Setup buffers
        BlockAmtCalcShader.SetBuffer(kernel, "sceneGeometry", sceneGeoBuffer);
        BlockAmtCalcShader.SetInt("numGeoObjs", numSceneObjs);

        BlockAmtCalcShader.SetBuffer(kernel, "radiationSources", radSourcesBuffer);
        BlockAmtCalcShader.SetInt("numSources", sourcesList.Length);

        // Buffer which stores outputted block amount
        BlockAmtCalcShader.SetBuffer(kernel, "sourcePlayerBlock", sourcePlayerBlockBuffer);

        // Set player position
        GameObject player = GameObject.Find("Main Camera");
        Vector3 v = player.transform.position;
        BlockAmtCalcShader.SetVector("playerPos", v);

        // Dispatch shader
        int workgroupsX = Mathf.CeilToInt(sourcesList.Length / 16.0f);
        BlockAmtCalcShader.Dispatch(kernel, workgroupsX, 1, 1);


        // Perform post processing
        Graphics.Blit(source, destination, radiationEffectShader);
    }

    void OnDestroy(){
        radSourcesBuffer.Release();
    }
}
