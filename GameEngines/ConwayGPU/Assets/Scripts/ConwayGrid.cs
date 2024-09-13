 using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class ConwayGrid : MonoBehaviour
{

    /* Store a numerical representation of what cells on the grid are active.
     * Dead cells are 0 and Living cells are 1 
    */
    public int[,] gridRep;

    // The size (in world units) of the dividers between cells
    private static readonly float DIVIDER_SIZE = 0.05f;

    // The number of cells long and wide this grid is
    public int Size = 30;

    // The camera this grid should be positioned in front of
    public Camera Cam;

    // Material to use on the dividers
    public Material DividerMat;

    // Material to use on cells
    public Material CellMat;

    // Material to use on Color's when they are selected / living;
    public Material LivingCellMat;


    // List of cell divider objects that run in the x direction
    private List<GameObject> horizontalDividers = new List<GameObject>();

    // List of cell divider objects that run in the y direction
    private List<GameObject> verticalDividers = new List<GameObject>();

    // List of objects which represents the cells in the game
    private List<GameObject> cells = new List<GameObject>();

    public ComputeShader GridCompute;

    // Build the board on start or resize. Remove any existing dividers and add new ones to divide the board into the proper number of cells.
    private void buildBoard(int numCells)
    {
        // Delete existing dividers and cells
        for (int i = 0; i < horizontalDividers.Count; i++)
        {
            Destroy(horizontalDividers[i]);
        }

        for (int i = 0; i < verticalDividers.Count; i++)
        {
            Destroy(horizontalDividers[i]);
        }
        for(int i = 0; i < cells.Count; i++)
        {
            Destroy(cells[i]);
        }
        horizontalDividers.Clear();
        verticalDividers.Clear();
        cells.Clear();

        // Remake the active / dead cells numerical representation array
        gridRep = new int[numCells, numCells];
        for(int i = 0; i < numCells; i++)
        {
            for(int j = 0; j < numCells; j++)
            {
                gridRep[i, j] = 0;
            }
        }
        

        // Setup sizes and offsets
        Size = numCells;
        float sideLen = (Cam.orthographicSize * 2) - (2 * DIVIDER_SIZE);
        float offset = sideLen / 2;
        float cellSize = sideLen / Size;
        float cellObjSize = cellSize - DIVIDER_SIZE;

        // Create new horizontal dividers
        for (int i =0; i < numCells + 1; i++)
        {
            GameObject newDiv = GameObject.CreatePrimitive(PrimitiveType.Cube);
            newDiv.transform.position = new Vector3(transform.position.x, (offset) - (i * cellSize), 0);
            newDiv.transform.localScale = new Vector3(sideLen, DIVIDER_SIZE, DIVIDER_SIZE);
            newDiv.GetComponent<MeshRenderer>().material = DividerMat;
            horizontalDividers.Add(newDiv);
        }

        // Create new vertical dividers
        for (int i = 0; i < numCells + 1; i++)
        {
            GameObject newDiv = GameObject.CreatePrimitive(PrimitiveType.Cube);
            newDiv.transform.position = new Vector3(offset - (i * cellSize), transform.position.y, 0);
            newDiv.transform.localScale = new Vector3(DIVIDER_SIZE, sideLen, DIVIDER_SIZE);
            newDiv.GetComponent<MeshRenderer>().material = DividerMat;
            verticalDividers.Add(newDiv);
        }

        // Add cell objs
        for(int i = 0; i < numCells; i++)
        {
            for(int j=0; j < numCells; j++)
            {
                Vector3 pos = new Vector3(((offset - (DIVIDER_SIZE / 2)) - (i * cellSize)) - (cellObjSize / 2), ((offset - (DIVIDER_SIZE / 2)) - (j * cellSize)) - (cellObjSize / 2), 0);
                Vector3 scale = new Vector3(cellObjSize, cellObjSize, DIVIDER_SIZE);
                GameObject newCell = ConwayCell.CreateConwayCell(pos, scale, i, j, CellMat, LivingCellMat);
                cells.Add(newCell);

            }

        }
    }

    // Start is called before the first frame update
    void Start()
    {
        buildBoard(Size);
    }

    // Update is called once per frame
    void Update()
    {
        // Use compute shader to calculate next board state

        int kernel = GridCompute.FindKernel("CSMain");
        GridCompute.
        TextureCreator.SetInt("SideLen", sideLen);
        int workgroupsX = Mathf.CeilToInt(sideLen / 8.0f);
        int workgroupsY = Mathf.CeilToInt(sideLen / 8.0f);
        TextureCreator.Dispatch(kernel, workgroupsX, workgroupsY, 1);
    }
}
