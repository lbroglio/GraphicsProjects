using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class ConwayCell : MonoBehaviour
{

    // Create a new conway cell. It's material values and transform will be set using the arguments
    // It also tracks what cell in the grid it is
    public static GameObject CreateConwayCell(Vector3 pos, Vector3 scale, int xId, int yId, Material cellMaterial, Material livingCellMaterial)
    {
        // Load conway cell prefab
        GameObject cellPrefab = Resources.Load("Prefabs/ConwayCellPrimitive", typeof(GameObject)) as GameObject;

        // Instantiate and setup cell
        GameObject newCell = Instantiate(cellPrefab,pos, Quaternion.identity);
        newCell.transform.localScale = scale;
        newCell.GetComponent<ConwayCell>().CellMaterial = cellMaterial;
        newCell.GetComponent<ConwayCell>().LivingCellMaterial = livingCellMaterial;
        newCell.GetComponent<MeshRenderer>().material = cellMaterial;
        newCell.GetComponent<ConwayCell>().xId = xId;
        newCell.GetComponent<ConwayCell>().yId = yId;


        return newCell;
    }

    // Default material to use on cells
    private Material CellMaterial;

    // Material to use on cells that are highlighted / selected
    private Material LivingCellMaterial;

    // Track if this cell is highlighted
    private bool highlighted = false;

    // The x index of this cell in the numerical grid representation of the grid for the game of life
    private int xId;
    // The y index of this cell in the numerical grid representation of the grid for the game of life
    private int yId;

    public int getX()
    {
        return xId;
    }

    public int getY()
    {
        return yId;
    }

    // What to do when this cell is clicked on
    public void ClickedOn()
    {
        if(!highlighted)
        {
            highlighted = true;
            GetComponent<MeshRenderer>().material = LivingCellMaterial;
            GameObject grid =  GameObject.Find("ConwayGrid");
            grid.GetComponent<ConwayGrid>().gridRep[xId, yId] = 1;
        }
        else
        {
            highlighted = false;
            GetComponent<MeshRenderer>().material = CellMaterial;
            GameObject grid = GameObject.Find("ConwayGrid");
            grid.GetComponent<ConwayGrid>().gridRep[xId, yId] = 0;

        }
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