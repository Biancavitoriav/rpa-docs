import { Grid, TextField, Button, Checkbox, FormControlLabel, Typography, Box, Stack } from "@mui/material";
import emailIcon from "../assets/email-icon.png";
export default function EmailSummaryForm() {
  return (
    <Grid container columns={12} spacing={2} padding={3} >
      <Grid item xs={12}>
      <Box
      sx={{
        background: "linear-gradient(to right, #C1BEED, #EC9EB4)",
        padding: 2
      }}>
        <Typography fontWeight="bold" marginLeft="60px"><img src={emailIcon} alt="icon" width={24} height={24} style={{ marginRight: 8, marginTop: 8 }}/>
        Resumindo seus e-mails</Typography>
    </Box>
      </Grid>

      {/* Formulário - Lado Esquerdo */}
      <Grid item xs={8} md={4} marginTop={5}>
        <Typography variant="h5" fontWeight="bold">
          Leitura de e-mails
        </Typography>
        <Typography>Preencha os campos a seguir</Typography>

        <TextField fullWidth label="Data" margin="normal" />
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Senha" margin="normal" type="password" />
        <br/>
        <Button fullWidth variant="contained" sx={{ marginTop: 2, fontWeight: 800  }}>
          RESUMIR OS E-MAILS
        </Button>
      </Grid>

      {/* Resumo - Lado Direito */}
      <Grid item xs={12} md={8}>
        <Box marginTop="50px" marginLeft="30px" border="1px solid rgb(38, 38, 38)" borderRadius="5px" padding="20px"
        >
      <Typography width="px">
        Resposta:
      </Typography>
 
      <Stack padding="2">
        <Box>
          <Typography fontWeight="bold" marginTop="10px">Leitura de e-mails</Typography>
          <Typography variant="body2" color="text.secondary" marginTop="10px">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold" marginTop="10px">Leitura de e-mails</Typography>
          <Typography variant="body2" color="text.secondary" marginTop="10px">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" fontSize="1" marginTop="10px" fontWeight="bold">
            Leitura de e-mails
          </Typography>
          <Typography variant="body2" color="text.secondary" marginTop="10px">
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>
      </Stack>
    </Box>
      </Grid>
    </Grid>
  );
}
