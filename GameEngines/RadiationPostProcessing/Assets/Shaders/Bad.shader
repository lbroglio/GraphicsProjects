Shader "Custom/PostProcessing/Bad"
{
    HLSLINCLUDE 
        #include "Packages/com.unity.postprocessing/PostProcessing/Shaders/StdLib.hlsl"
    ENDHLSL
    SubShader
    {
        Cull Off ZWrite Off ZTest Always
        Pass
        {
            HLSLPROGRAM
                #pragma vertex VertDefault
                #pragma fragment frag

                struct RadiationSource {
                    float strength;
                    float4 pos;
                };
                

                float intensity;
                float maximumEffectRadius;
                uint screenWidth;

                float4 playerPos;

                StructuredBuffer<RadiationSource> radiationSources;
                uint numSources;

                // hash function which simulates random numbers
                uint PCGHash(uint rng_state)
                {
                    rng_state = rng_state * 747796405u + 2891336453u;
                    uint state = rng_state;
                    uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
                    return (word >> 22u) ^ word;
                }

                float4 frag (VaryingsDefault i) : SV_Target
                {
                    /*
                    // For every radiation source
                    float totalDistortion = 0;
                    for(uint j =0; j < numSources; j++){
                        // Get random intensity for this pixel + specific source
                        uint seed = ((i.texcoord.y * screenWidth) + i.texcoord.x * 10) + 1; 
                        float effectIntensity = PCGHash(seed) / float(0xFFFFFFFFU);

                        // Scale random intensity based on how close the player is to the  source.
                        float distPercent = 1 - (distance(radiationSources[j].pos, playerPos) / maximumEffectRadius);
                        effectIntensity *= distPercent;

                        totalDistortion += effectIntensity;
                    }
                    */

                    // Add distortion to the current color
                    //float4 pixColor = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.texcoord);
                    //pixColor += totalDistortion;
                    
                    return float4(1, 0, 0, 1);
                }

            ENDHLSL
        }
    }
}
