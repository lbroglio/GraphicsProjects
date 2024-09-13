using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class InputHandler : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {

        // If 'esc' or 'q' is pressed quit the game
        if (Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.Q))
        {
            Application.Quit();
        }

        // When the mouse is clicked
        if (Input.GetMouseButtonDown(0))
        {
            // Cast a ray from the camera to the mouse click position
            GameObject camera = GameObject.Find("Main Camera");
            Vector3 mouseClickPos = Input.mousePosition;

            RaycastHit hitInfo;
            Ray r = Camera.main.ScreenPointToRay(Input.mousePosition);
            Physics.Raycast(r, out hitInfo);

            // If a cell was hit
            if(hitInfo.collider != null && hitInfo.collider.GetComponent<ConwayCell>() != null) {
                hitInfo.collider.GetComponent<ConwayCell>().ClickedOn();
            }
        }
    }
}
