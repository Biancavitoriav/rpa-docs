import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Skeleton,
} from "@mui/material";
import bookIcon from "../assets/bookIcon.png";
import { useState } from "react";
import React from "react";

export default function EmailSummaryForm() {
  const [news, setNews] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) || 0;
    setLimit(value);
  };

  const cleanResponse = (htmlString: string) => {
    return htmlString.replace(/\n/g, "").trim(); // Remove quebras de linha e espaços extras
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      console.log("ENTROU NO HANDLE CLICK>>>>>>>>>");

      const response = await fetch(`http://localhost:3001/scrape-news?limit=${limit}`);
      const data = await response.json(); // Pegando a resposta como JSON

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      if (data.result) {
        const cleanedHtml = cleanResponse(data.result); // Pegando apenas o "result" e limpando
        setNews(cleanedHtml);
        console.log(cleanedHtml);
      } else {
        console.error("Erro: 'result' não encontrado no JSON.");
      }
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
    }
    setLoading(false);
  };

  return (
    <Grid container columns={12} spacing={2} padding={3}>
      <Grid item xs={12}>
        <Box
          sx={{
            background: "linear-gradient(to right, #C1BEED, #EC9EB4)",
            padding: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={bookIcon} alt="icone" style={{ width: 24, height: 24, marginRight: 8 }} />
            <Typography fontWeight="bold">Resumindo suas notícias</Typography>
          </Box>
        </Box>
      </Grid>

      {/* Formulário - Lado Esquerdo */}
      <Grid item xs={8} md={4} marginTop={5}>
        <Typography variant="h5" fontWeight="bold">
          Resumo de notícias
        </Typography>
        <Typography marginTop="20px">Preencha os campos a seguir</Typography>

        <TextField
          fullWidth
          label="Quantidade De Notícias (máx: 6)"
          margin="normal"
          type="number"
          value={limit}
          onChange={handleOnChangeInput}
        />
        <br />
        <Button
          onClick={handleClick}
          fullWidth
          variant="contained"
          sx={{ marginTop: 2, fontWeight: 800 }}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Buscar Notícias"}
        </Button>
      </Grid>

      {/* Resumo - Lado Direito */}
      <Grid item xs={12} md={8}>
        <Box
          marginTop="50px"
          marginLeft="30px"
          border="1px solid rgb(38, 38, 38)"
          borderRadius="5px"
          padding="20px"
        >
          <Typography>Resposta:</Typography>
          <br/>
          <Stack padding="2">
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={200} />
            ) : news ? (
              <Box dangerouslySetInnerHTML={{ __html: news }} />
            ) : (
              <Typography color="text.secondary">Nenhuma notícia carregada.</Typography>
            )}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
