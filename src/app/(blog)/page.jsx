import TelaPublicacao from "../Componentes/TelaPublicacao/index.jsx"
import looger from "../../logger.js"
import Link from "next/link.js"
import db from "../../../prisma/db.js"

async function getPublicacao(page, searchTerm) {
  try {
    const where = {}
    if (searchTerm) {
      where.titulo = { contains: searchTerm, mode: "insensitive" }
    }
    const postPorPagina = 6
    const skip = (page - 1) * postPorPagina
    //pegar proxima pagina
    const TotalItems = await db.post.count({ where })
    const TotalPages = Math.ceil(TotalItems / postPorPagina)
    const next = page < TotalPages ? page + 1 : null
    console.log(next)
    //pega pagina anterior
    const prev = page > 1 ? page - 1 : null

    //acessa o banco de dados
    const posts = await db.post.findMany({
      take: postPorPagina, //quantos post por pagina
      orderBy: { id: "desc" }, //ordena os posts pela data em ordem decrescente
      skip: skip,
      where: where, //
      include: {
        author: true,
        comentarios: true,
      },
    })

    // Converta as datas para strings antes de retornar os posts
    const formattedPosts = posts.map((post) => ({
      ...post,
      data: post.data.toISOString(), // Converta para string ISO
    }))
    console.log(formattedPosts)
    return { data: formattedPosts, prev: prev, next: next }
  } catch (error) {
    looger.error(" falha em pegar as publicações", { error })
    return { data: [], prev: null, next: null }
  }
}

export default async function Home({ searchParams }) {
  const PaginaAtual = parseInt(searchParams?.page || 1)
  const searchTerm = searchParams?.q
  const {
    data: posts,
    prev,
    next,
  } = await getPublicacao(PaginaAtual, searchTerm)

  return (
    <section className="flex justify-center items-center gap-16 w-full flex-wrap ">
      <TelaPublicacao post={posts} />
      <div className="flex items-start gap-12">
        {prev && (
          <Link
            href={{ pathname: "/", query: { page: prev, q: searchTerm } }}
            className="mt-4 text-textoPrincipal  bg-botao text-md flex items-center gap-2 justify-center p-2 rounded-lg hover:rounded-full transition-all"
          >
            Pagina Anterior
          </Link>
        )}
        {next && (
          <Link
            href={{ pathname: "/", query: { page: next, q: searchTerm } }}
            className="mt-4 text-textoPrincipal  bg-botao text-md flex items-center gap-2 justify-center p-2 rounded-lg hover:rounded-full transition-all"
          >
            Próxima Pagina
          </Link>
        )}
      </div>
    </section>
  )
}
