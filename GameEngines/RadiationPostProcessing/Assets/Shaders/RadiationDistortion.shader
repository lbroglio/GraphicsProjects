Shader "Custom/PostProcessing/RadiationDistortion"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
    }
    SubShader
    {
        // No culling or depth
        Cull Off ZWrite Off ZTest Always

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            // TODO: Lessen effect if an object is between the player and the radiation source

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };

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

            sampler2D _MainTex;

            // hash function which simulates random numbers
            uint PCGHash(uint rng_state)
            {
                rng_state = rng_state * 747796405u + 2891336453u;
                uint state = rng_state;
                uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
                return (word >> 22u) ^ word;
            }

            float rand_1_05(in float2 uv)
            {
                float2 noise = (frac(sin(dot(uv ,float2(12.9898,78.233)*2.0)) * 43758.5453));
                return abs(noise.x + noise.y);
            }



            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target {

                float totalDistortion = 0;
                float4 debug;
                for(uint j =0; j < numSources; j++){


                    float distToSource = distance(radiationSources[j].pos, playerPos);
                    
                    // If the player is within the minimum radius
                    if(distToSource < maximumEffectRadius){
                        // Get random intensity for this pixel + specific source
                        float effectIntensity = rand_1_05(i.uv);

                        // Scale random intensity based on how close the player is to the  source.
                        float distPercent = 1 - (distToSource / maximumEffectRadius);
                        effectIntensity *= distPercent;

                        // Scale by hardcoded intensity 
                        effectIntensity *= intensity;


                        totalDistortion += effectIntensity;
                    }

                }
                
                // Add distortion to the color
                fixed4 col = tex2D(_MainTex, i.uv);
                
                col.rgb += totalDistortion;

                return col;
            }
            ENDCG
        }
    }
}
