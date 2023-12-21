import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MatrixTable = () => {
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [allocation, setAllocation] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const addRow = () => {
    const newMatrix = [...matrix, Array(matrix[0].length).fill(0)];
    setMatrix(newMatrix);
  };

  const removeRow = () => {
    if (matrix.length > 1) {
      const newMatrix = matrix.slice(0, -1);
      setMatrix(newMatrix);
    }
  };

  const addColumn = () => {
    const newMatrix = matrix.map((row) => [...row, 0]);
    setMatrix(newMatrix);
  };

  const removeColumn = () => {
    if (matrix[0].length > 1) {
      const newMatrix = matrix.map((row) => row.slice(0, -1));
      setMatrix(newMatrix);
    }
  };

  function leastCostMethodWithSupplyDemand(costMatrix, supply, demand) {
    const rows = costMatrix.length;
    const cols = costMatrix[0].length;

    //demandı kopyala ve fonksiyonun sonuda talep değerlerini yerine koy

    // Ensure the matrix is not empty
    if (rows === 0 || cols === 0) {
      return "Cost matrix is empty.";
    }

    // Check if supply and demand arrays are provided and have correct lengths
    if (supply.length !== rows || demand.length !== cols) {
      return "Supply and demand arrays are not compatible with the cost matrix.";
    }

    // Initialize variables to track allocations
    const allocations = [];
    let totalCost = 0;

    // Iterate until all supply and demand are satisfied
    while (supply.some((s) => s > 0) && demand.some((d) => d > 0)) {
      // Find the minimum cost and its position
      let minCost = Infinity;
      let minRow = -1;
      let minCol = -1;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (costMatrix[i][j] < minCost && supply[i] > 0 && demand[j] > 0) {
            minCost = costMatrix[i][j];
            minRow = i;
            minCol = j;
          }
        }
      }

      // Determine the quantity to allocate
      const quantity = Math.min(supply[minRow], demand[minCol]);

      // Allocate to minimize the cost
      allocations.push({
        row: minRow,
        col: minCol,
        quantity,
        //kac talep kaldıgını bul
        kackaldi:demand[minCol]-quantity
      });

      // Update supply and demand
      supply[minRow] -= quantity;
      demand[minCol] -= quantity;

      // Accumulate the total cost
      totalCost += quantity * costMatrix[minRow][minCol];
    }

    //matrisin son satırını talep stateinden gelen değerlerle değiştir
    setAllocation(allocations);
    setTotalCost(totalCost);
    return {
      allocations,
      totalCost,
    };
  }

  const resolve = () => {
    // Matrisin kopyasını oluştur
    const newMatrix = matrix.map((row) => [...row]);
    console.log(newMatrix);

    // Matrisin son satırını ve son sütununu çıkartarak arz ve talep arraylerini oluştur
    const talep = newMatrix.pop();
    talep.pop();

    const arz = newMatrix.map((row) => row.pop());
    console.log(arz, talep);
    console.log(matrix);

    // Arz ve talebin son elemanlarını sil
    const result = leastCostMethodWithSupplyDemand(newMatrix, arz, talep);
    console.log(result);
  };

  return (
    <>
    
    <Grid item
    
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      mt: 10,
    }}>
     

    <Typography variant="h3" component="h3" gutterBottom>
      Tanrı çizdi tüm resimleri
    </Typography>


</Grid> 
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        mt: 10,
      }}
    >

      
      <Grid item>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {matrix[0].map((_, index) => (
                    <TableCell sx={{ textAlign: "center" }} key={index}>
                      {index === matrix[0].length - 1 ? "Arz" : `X${index + 1}`}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {matrix.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {rowIndex === matrix.length - 1
                        ? "Talep"
                        : `Y${rowIndex + 1}`}
                    </TableCell>
                    {row.map((cell, columnIndex) => (
                      <TableCell key={columnIndex}>
                        <TextField
                          type="number"
                          value={cell}
                          sx={{
                            width: "13ch",
                            alignContent: "center",
                            textAlign: "center", // Metni ortalamak için eklenen satır
                          }}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            const newMatrix = matrix.map((r, i) =>
                              i === rowIndex
                                ? r.map((c, j) =>
                                    j === columnIndex ? +newValue : c
                                  )
                                : r
                            );
                            setMatrix(newMatrix);
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          sx={{ mt: 2 }}
        >
          <IconButton onClick={addRow}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={removeRow}>
            <RemoveIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        sx={{ ml: 2 }}
      >
        <IconButton onClick={addColumn}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={removeColumn}>
          <RemoveIcon />
        </IconButton>
      </Grid>

      <Grid container justifyContent="center" item sx={{ ml: 2 }} xs={12}>
        <Button variant="contained" color="primary" onClick={resolve}>
          Çöz
        </Button>
      </Grid>
      {/* //başlık at */}
      <Grid container justifyContent="center" item sx={{ ml: 2 }} xs={12}>
        
        <h1>Toplam Maliyet: {totalCost}</h1>

      </Grid>

      <Grid container justifyContent="center" item sx={{ ml: 2 }} xs={12}>
        <h1>Atamalar</h1>
      </Grid>


      <Grid
        container
        justifyContent="center"
        item
        sx={{ ml: 2, mt: 2,mb: 10 }}
        xs={12}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Yerleştirme</TableCell>
                <TableCell>Atanan Arz</TableCell>
                <TableCell>Atama sonrası kalan Talep</TableCell>
                <TableCell>Maliyet</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allocation.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {`X${row.col + 1} - Y${row.row + 1}`}
                  </TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{
                  row.kackaldi 
                  }</TableCell>
                  <TableCell>{matrix[row.row][row.col]*row.quantity} 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
    </Grid>
    </>
  );
};



export default MatrixTable;
