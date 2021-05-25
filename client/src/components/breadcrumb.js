import { useState, useEffect } from "react";
import '../styles/breadcrumbs.scss';

const Breadcrumb = props => {
  const { sendCategories } = props
  const [getCategories, setgetCategories] = useState(sendCategories);

  useEffect(() => {
    setgetCategories(sendCategories)
  }, [sendCategories]);

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-display">
      <ol className="breadcrumb">
        {getCategories.map(item => (
          <li className="breadcrumb-item" aria-current="page" key={item.name}> {item.name}</li>
        ))}

      </ol>
    </nav>
  )
}

export default Breadcrumb;

