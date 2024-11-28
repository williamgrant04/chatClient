const ServerHover = ({ server, show }: {server: any, show: boolean}) => {

  return (
    <div style = {{ display: show ? "block" : "none" }}>
      <h1>{server.name}</h1>
      <p>{server.createdAt}</p>
    </div>
  )
}

export default ServerHover
