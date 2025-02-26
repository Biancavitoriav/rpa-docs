
import { Grid, TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

export default function EmailSummaryForm() {
  return (
    <Grid container columns={12} spacing={2} padding={3} >
      
      {/* Cabeçalho */}
      <Grid item xs={12}>
        <Typography >
          HEADER
        </Typography>
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

        <Typography sx={{ marginTop: 1 }}>Selecione qual plataforma você utiliza:</Typography>
        <FormControlLabel control={<Checkbox />} label="Gmail" />
        <br/>
        <FormControlLabel control={<Checkbox />} label="Outlook" />
        <br/>
        <br/>
        <Button fullWidth variant="contained" sx={{ marginTop: 2, fontWeight: 800  }}>
          RESUMIR OS E-MAILS
        </Button>
      </Grid>

      {/* Resumo - Lado Direito */}
      <Grid item xs={12} md={8}>
        <Typography>RESPOSTA</Typography>
      </Grid>

    </Grid>
  );
}
