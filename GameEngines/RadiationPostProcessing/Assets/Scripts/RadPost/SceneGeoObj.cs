using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneGeoObj : MonoBehaviour
{

    /// <summary>
    /// Represents a type of material a piece of scene Geometry can be made of.
    ///  Uses representative names not literal ones  
    ///     Ie concrete also includes drywall and Iron is any similar metal
    /// Wood type: 4.7 meters to fully dissipate radiation
    /// Iron type: 1 meter to fully dissipate radiation
    /// Concrete Type: 2 meters to fully dissipate
    /// Lead Type: .45 Meters to fully dissipate
    /// </summary> 
    public enum MaterialType {
        WOOD = 0,
        IRON = 1,
        CONCRETE = 2,
        LEAD = 3
    }

    public MaterialType matType;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
