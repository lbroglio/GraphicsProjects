using System.Collections;
using System.IO;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class ConwayGrid : MonoBehaviour
{

    /* Store a numerical representation of what cells on the grid are active.
     * Dead cells are 0 and Living cells are 1 
    */
    public int[] gridRep;

    // The size (in world units) of the dividers between cells
    private static readonly float DIVIDER_SIZE = 0.05f;

    // The number of cells long and wide this grid is
    public int Size = 32;

    // The camera this grid should be positioned in front of
    public Camera Cam;

    // Material to use on the dividers
    public Material DividerMat;

    // Material to use on cells
    public Material CellMat;

    // Material to use on Color's when they are selected / living;
    public Material LivingCellMat;

    public int targetFrameRate = 10;

    // List of cell divider objects that run in the x direction
    private List<GameObject> horizontalDividers = new List<GameObject>();

    // List of cell divider objects that run in the y direction
    private List<GameObject> verticalDividers = new List<GameObject>();

    // List of objects which represents the cells in the game
    private GameObject[,] cells;

    public ComputeShader GridCompute;

    private bool simRunning = false;

    private ComputeBuffer previousGrid;
    private ComputeBuffer nextGrid;



    // Start the simulation of conways game of life
    public void StartSim(){
        simRunning = true;
    }

    // Get whether or not the simulation is running
    public bool SimRunning(){
        return simRunning;
    }

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
        // If the cells array exists
        if(cells != null){
            for(int i = 0; i < Size; i++)
            {
                for(int j =0; j < Size; j++){
                    Destroy(cells[i, j]);
                }
            }
        }
        horizontalDividers.Clear();
        verticalDividers.Clear();

        // Remake cells array
        cells = new GameObject[numCells, numCells];

        // Release compute buffers if necessary
        if(previousGrid != null){
            previousGrid.Release();
        }
        if(nextGrid != null){
            nextGrid.Release();
        }

        // Remake the active / dead cells numerical representation array
        gridRep = new int[numCells * numCells];
        for(int i = 0; i < numCells; i++)
        {
            for(int j = 0; j < numCells; j++)
            {
                gridRep[i + (j * numCells)] = 0;
            }
        }
        
        // Remake compute buffer
        previousGrid = new ComputeBuffer(Size * Size, sizeof(int), ComputeBufferType.Default);
        nextGrid = new ComputeBuffer(Size * Size, sizeof(int));


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
                cells[i, j] = newCell;
            }

        }
    }

    // Start is called before the first frame update
    void Start()
    {
        buildBoard(Size);
        
    }

    void OnDestroy(){
        // Release compute buffers if necessary
        if(previousGrid != null){
            previousGrid.Release();
        }
        if(nextGrid != null){
            nextGrid.Release();
        }
    }

    // Update is called once per frame
    void Update()
    {

        QualitySettings.vSyncCount = 0;
		Application.targetFrameRate = targetFrameRate;

        // If the simulation is running 
        if(simRunning){
            // Use compute shader to calculate next board state
            int kernel = GridCompute.FindKernel("CSMain");
            GridCompute.SetInt("gridSize", Size);

            // Load buffer with data
            previousGrid.SetData(gridRep);

            // Debugging 
            int[] allTwos = new int[gridRep.Length];
            for(int i = 0; i < gridRep.Length; i++){
                allTwos[i] = 2;
            } 
            nextGrid.SetData(allTwos);

            // Setup compute buffers
            GridCompute.SetBuffer(kernel, "PreviousGrid", previousGrid);
            GridCompute.SetBuffer(kernel, "CurrGrid", nextGrid);

            // Dispatch compute shader
            int workgroupsX = Mathf.CeilToInt(Size / 8.0f);
            int workgroupsY = Mathf.CeilToInt(Size / 8.0f);
            GridCompute.Dispatch(kernel, workgroupsX, workgroupsY, 1);

            // Set grid rep from compute buffer
            nextGrid.GetData(gridRep);

            // Output grid rep to debug
            string debugStr = "Curr:\n";
            for(int j =0; j < Size; j++){
                for(int i =0; i < Size; i++){
                    debugStr += gridRep[i + (j * Size)];
                }

                debugStr += '\n';
            }

            // Update grid to match new representation
            for(int j = 0; j < Size; j++){
                for(int i = 0; i < Size; i++){
                    int numRep = gridRep[i + (j * Size)];
                    if(numRep == 0){
                        //Debug.Log("HERE0");
                        cells[i, j].GetComponent<ConwayCell>().SetState(ConwayCell.CellState.DEAD);
                    }
                    else{
                        //Debug.Log("HERE");
                        cells[i, j].GetComponent<ConwayCell>().SetState(ConwayCell.CellState.ALIVE);
                    }
                }
            }

            // If no cells are alive end simulation
            bool foundLiving = false;
            for(int i =0; i < Size * Size; i++){
                if(gridRep[i] == 1){
                    foundLiving = true;
                    break;
                }
            }

            if(!foundLiving){
                simRunning = false;
            }

        }



    }
}
