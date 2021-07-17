export default function Tabs(props){
  const { tabs, activeTab, onChange } = props;

  if(!tabs || tabs?.length < 1) return null;

  return (
    <ul className="list-reset flex border-b my-5 table w-full sticky top-11 bg-white">
      {tabs.map((tab) => {
        const isActive = activeTab == tab.route;
        return (
          <li key={tab.route} className={`-mb-px table-cell text-center hover:bg-gray-100 ${isActive ? 'bg-gray-200 hover:bg-gray-200 rounded-t' : ''}`}>
            <div onClick={() => onChange(tab)} className={`cursor-pointer inline-block py-2 px-4 text-blue-dark font-semibold text-center w-full`} >{tab.title}</div>
          </li>
        )
      })}
    </ul>
  )
}
