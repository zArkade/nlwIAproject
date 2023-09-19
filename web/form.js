import { transcribe } from "../server/transcribe.js"
import { transcriptionExample } from "../server/utils/transcription.js"
import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  
  const videoURL = input.value
  
  if (!videoURL.includes("shorts")){
    return (content.textContent = "Esse vídeo não é um short.")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."
  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Entendendo o texto..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = "Realizando o resumo..."

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})