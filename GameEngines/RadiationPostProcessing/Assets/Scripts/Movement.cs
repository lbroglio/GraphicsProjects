using System.Collections;
using System.Collections.Generic;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;

public class Movement : MonoBehaviour
{

    public float Speed = 10;
    public float RotationalSpeed = 500;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        // Change position based on key input
        float xTransform = 0;
        float yTransform = 0;
        float zTransform = 0;
        
        // Get keys
        if(Input.GetKey(KeyCode.W)){
            zTransform = Speed * Time.deltaTime;
        }
        else if(Input.GetKey(KeyCode.S)){
            zTransform = -1 * Speed * Time.deltaTime;
        }


        if(Input.GetKey(KeyCode.A)){
            xTransform = -1 * Speed * Time.deltaTime;
        }
        else if(Input.GetKey(KeyCode.D)){
            xTransform = Speed * Time.deltaTime;
        }

        if(Input.GetKey(KeyCode.Space)){
            yTransform = Speed * Time.deltaTime;
        }
        else if(Input.GetKey(KeyCode.LeftShift)){
            yTransform = -1 * Speed * Time.deltaTime;
        }

        // Rotate transform to match camera orientation
        Vector3 inputTransform = new Vector3(xTransform, yTransform, zTransform);
        inputTransform = Matrix4x4.Rotate(transform.rotation) * inputTransform;
        transform.position += inputTransform;

        // Rotate camera based on mouse
        float yAxisRot = Time.deltaTime * RotationalSpeed * Input.GetAxis("Mouse Y");
        float xAxisRot = -1 * Time.deltaTime * RotationalSpeed * Input.GetAxis("Mouse X");
        transform.Rotate(yAxisRot, xAxisRot, 0);
    }
}
