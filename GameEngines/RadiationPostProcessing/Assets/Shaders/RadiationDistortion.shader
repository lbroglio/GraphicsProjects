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
                uint id;
            };
            

            float intensity;
            float maximumEffectRadius;
            uint screenWidth;

            float4 playerPos;

            StructuredBuffer<RadiationSource> radiationSources;
            RWStructuredBuffer<float> sourcePlayerBlock;
            uint numSources;

            float frameNum;

            sampler2D _MainTex;

            float random1_21(float2 st) {
                return frac(sin(dot(st.xy,float2(12.9898,78.233)))*43758.5453123);
            }


            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target {

                // Calculate the ammount to distort this pixel by
                float totalDistortion = 0;
                for(uint j =0; j < numSources; j++){
                    
                    float distToSource = distance(radiationSources[j].pos, playerPos);
                    
                    // If the player is within the minimum radius
                    if(distToSource < maximumEffectRadius){
                        // Get random intensity for this pixel, frame, and source
                        float effectRand = random1_21(i.uv * (j + 1) * frameNum);        

                        // Calculate the value above which a pixel isn't affected by the radiation
                        // By taking the intensity value and scaling it down based on distance
                        float distPercent = 1 - (distToSource / maximumEffectRadius);
                        float effectCutoff = intensity * radiationSources[j].strength * distPercent;
                        
                        // If the random value is less than the cutoff increase brightness of this pixel
                        // by a random amount between 1 - 5
                        if(effectRand < effectCutoff){
                            totalDistortion += 1 + ceil(radiationSources[j].strength / 10);
                        }
                    }

                }

                // Get the base color
                fixed4 col = tex2D(_MainTex, i.uv);

                // If there is a distortion increase the brightness
                if(totalDistortion > 0){
                    // Ensure no components of a distorted pixel are 0
                    fixed4 intrmCol = col + 0.1;

                    return intrmCol * totalDistortion;
                }
                
                // Return unchanged color
                return col;
            }
            ENDCG
        }
    }
}
