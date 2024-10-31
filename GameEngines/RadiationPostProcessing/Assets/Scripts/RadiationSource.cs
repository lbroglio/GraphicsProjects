using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RadiationSource : MonoBehaviour
{

    public float strength = 1;

    public struct PassableRadiationSource{
        public float strength;
        public Vector4 pos;
    }

    // Return a struct representation of this object which can be sent to the GPU
    public PassableRadiationSource GetPassableRep(){
        PassableRadiationSource rep;
        rep.strength = (uint) strength;
        rep.pos = new Vector4(transform.position.x, transform.position.y, transform.position.z, 1);

        return rep;
    }



    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
