import { Feed } from "../components/feed/feed"
import { Menu } from "../components/left_menu/Menu"

export const Pets = () => {
  return <>
    <div>
      <div className="container d-flex">
        <Menu />
        <Feed />
      </div>
    </div>
  </>
}