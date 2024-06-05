const inputCssObject = {
  borderRadius: `20px 20px 20px 20px`,
  border: `2px solid var(--baseGray)`
}

const divCssObject = {
  borderBottom: `2px solid var(--baseGray)`
}

export const SearchBar = () => {
  return <>
    <div className="w-100 p-3" style={divCssObject}>
      <input className="w-100 form-control" style={inputCssObject} type="text" name="search" id="search" />
    </div>
  </>
}