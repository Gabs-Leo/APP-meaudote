import { SearchBar } from "../search_bar/SearchBar"

const cssObj = {
  width: `100%`,
  border: `2px solid var(--baseGray)`,
  borderTop: `0px solid black`
}

export const Feed = () => {
  return <>
    <div className="feed" style={cssObj}>
      <SearchBar />
    </div>
  </>
}