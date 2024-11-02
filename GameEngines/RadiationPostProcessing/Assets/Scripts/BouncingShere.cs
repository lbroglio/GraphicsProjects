using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BouncingShere : MonoBehaviour
{
    public float speed = 1;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(transform.position.z > 10){
            speed *= -1;
        }
        else if(transform.position.z < -10){
            speed *= -1;
        }

        transform.position += new Vector3(0, 0, speed) * Time.deltaTime;
    }
}
