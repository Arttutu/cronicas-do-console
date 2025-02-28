import React from "react"
import Comentario from "../Comentario"
import ModalResposta from "../ModalResposta"
import Resposta from "../Resposta"

export default function ListaDeComentarios({ comentarios }) {
  return (
    <ul className="flex flex-col gap-8">
      {comentarios.slice(-5).map((comentario) => (
        <li className="flex flex-col items-start gap-4" key={comentario.id}>
          <Comentario comentario={comentario} />
          <ModalResposta comentario={comentario} />
          <Resposta comentario={comentario} />
          <div className="w-full border-[1px] text-background2/30"></div>
        </li>
      ))}
    </ul>
  )
}
