import React from "react"
import { IoMdArrowRoundForward } from "react-icons/io"

export default function ComentarioBotao(props) {
  return (
    <button
      className="mt-4 text-textoPrincipal  bg-botao text-md flex items-center gap-2 justify-center p-2 rounded-lg hover:rounded-full transition-all"
      type="submit"
    >
      {props.texto}
      <IoMdArrowRoundForward />
    </button>
  )
}
