import ytdl from "ytdl-core"
import fs from "fs"
import { error } from "console"

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoID

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurantionMs / 1000

        if (seconds > 60) {
          throw new Error("A duração do vídeo é acima do permitido.")
        }
      })
      .on("end", () => {
        console.log("Download do video finalizado.")
        resolve()
      })
      .on("error", (Error) => {
        console.log(
          "Não foi possivel fazer o download do video. Detalhes do erro: " +
            error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
