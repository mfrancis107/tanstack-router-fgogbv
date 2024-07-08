import { createFileRoute } from '@tanstack/react-router'
import { $insert, $list } from '~/db/schema'

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => {
    return $list()
  },
})

function Home() {
  const data = Route.useLoaderData()
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() =>
          $insert({
            title: 'Hello',
            content: 'World',
          })
        }
      >
        Create Note
      </button>
      <ul>
        {data.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  )
}
