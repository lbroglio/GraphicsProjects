using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RadiationSource : MonoBehaviour
{
    // The id that will be given to the next source created
    public static uint nextId = 0;

    public uint id;

    public float strength = 1;


    public struct PassableRadiationSource{
        public float strength;
        public Vector4 pos;
        public uint id;
    }

    // Return a struct representation of this object which can be sent to the GPU
    public PassableRadiationSource GetPassableRep(){
        PassableRadiationSource rep;
        rep.strength = (uint) strength;
        rep.pos = new Vector4(transform.position.x, transform.position.y, transform.position.z, 1);
        rep.id = id;

        return rep;
    }

    void Awake(){
        id = nextId;
        nextId++;
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
