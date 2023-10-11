import React, { useState } from "react";
import "./App.css";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Button, Container, Grid, TextField ,Paper,Typography} from "@mui/material";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "your_openai_key",
  dangerouslyAllowBrowser: true 
});


function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });
  
      // Check if 'completion' and 'choices' are defined before accessing them
      if (completion && completion.data && completion.data.choices) {
        // Check if there's at least one choice
        if (completion.data.choices.length >= 0) {
          // Access the generated content
          const generatedContent = completion.data.choices[0].messages.content;
          setResponse(generatedContent);
          console.log("Format : ", generatedContent)
        } else {
          // Handle the case where no choices are available
          setResponse("No response available.");
        }
      } else {
        // Handle the case where the response structure is unexpected 
        const generatedContent = completion.choices[0].message.content
        setResponse(generatedContent );
        console.log(completion);
        
      }
  
      setIsLoading(false);
    } catch (e) {
      alert("Error: " + e.toString());
      setIsLoading(false);
    }
  }  
  /*async function handleSubmit() {
    setIsLoading(true);

    try {
      //const completion = await openai.createCompletion({
       // model: "gpt-3.5-turbo",
       // prompt: prompt,
        //max_tokens: 100,
        const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "gpt-3.5-turbo",
      });
      setResponse(completion.data.choices[0].message.content);
      setIsLoading(false);
    } catch (e) {
      alert("Error: " + e.toString());
      setIsLoading(false);
    }
  }*/
  return (
    <Container>
      <Box sx={{ width: "100%", mt: 4 }}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoFocus
              label="The Joker App - Enter your text"
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <Button
              fullWidth
              disableElevation
              variant="contained"
              disabled={isLoading}
              onClick={() => handleSubmit()}
              startIcon={
                isLoading && (
                  <AutorenewIcon
                    sx={{
                      animation: "spin 2s linear infinite",
                      "@keyframes spin": {
                        "0%": {
                          transform: "rotate(360deg)",
                        },
                        "100%": {
                          transform: "rotate(0deg)",
                        },
                      },
                    }}
                  />
                )
              }
              >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sx={{mt:3}}>
          <Typography variant="h6">Joker's Answer:</Typography>
          <Paper sx={{p:3}}>{response}</Paper>
        </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
