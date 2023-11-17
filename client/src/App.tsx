import "./index.css"
import { useState } from "react"
import { Office } from "./types"
import useOfficesData from "./hooks/useOfficesData"
import Payments from "./components/Payments"

const VALUES = [
  {
     currency: "Pesos",
     value: 1,
  },
  {
     currency: "Dolares",
     value: 17.22,
  },
  {
     currency: "Euro",
     value: 18.90,
  },
]
const ALL_OFFICES = 'All'


function App() {
  const { offices } = useOfficesData()
  const [currentOffice, setCurrentOffice] = useState(ALL_OFFICES)

  const officesArray =[ALL_OFFICES, ...Array.from(new Set(offices.map((Oficina) => {return Oficina.fiado })))]
  const filterOffices: Office[] = offices.filter(office => currentOffice === ALL_OFFICES || office.fiado === currentOffice)
    
  let totalPayValue: number = 0 
  let payOnTime: number = 0
  let overdueTotalPay: number = 0 

  filterOffices.map((officeData) => {
    totalPayValue += officeData.importe
    if(officeData.diasVencimiento < 33){
      payOnTime += officeData.importe
    }else{
      overdueTotalPay += officeData.importe
    }
   })
    
  const handleCurrentOffice = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.target.value
    setCurrentOffice(currentValue)  
  }

  return (
  <div className="bg-amber-50 min-h-screen px-7">
    <h1 className="text-4xl text-center py-10">Prima por cobrar</h1>
    <section className="mb-4 flex gap-4">
        <select name="" id="" className="w-36 px-1" onChange={handleCurrentOffice}>
          {
            officesArray.map((office) => {
              return (
                <option value={office} key={office}>{office}</option>
              )
            })
          }
        </select>   
    </section>
    {
        offices.length <= 1 ? 
        <p className="text-4xl text-center pt-10">No data found</p> :
        <>
          <section className="mb-10">
            <div className="grid grid-cols-3 gap-16 text-center">
              {
                VALUES.map(({currency: currency, value}) => {
                  return (
                    <Payments currency={currency} totalPayValue={totalPayValue} value={value} payOnTime={payOnTime} overdueTotalPay={overdueTotalPay}/>
                  )
                })
              }
            </div>
          </section>
          <section className="pb-5">
            <table className="w-full border border-spacing-0 border-separate  border-black text-center rounded-md">
              <thead>
                <tr className="[&>th]:p-3 [&>th]:border-black ">
                  <th className="border-r">Fianza</th>
                  <th className="border-r">Movimiento</th>
                  <th className="border-r">Fiado</th>
                  <th className="border-r">Antiguedad</th>
                  <th className="border-r">Dias de vencimiento</th>
                  <th >Importe</th>
                </tr>
              </thead>
              <tbody className="[&>tr>td]:p-1">
                {
                  filterOffices.map(({fianza, movimiento, fiado, antiguedad, diasVencimiento, importe, id }) => {
                    return (
                      <tr key={id} className="border border-black [&>td]:border-t [&>td]:border-black last:border-b-0">
                        <td className="border-r border-black">{fianza}</td>
                        <td className="border-r border-black">{movimiento}</td>
                        <td className="border-r border-black">{fiado}</td>
                        <td className="border-r border-black">{antiguedad}</td>
                        <td className={diasVencimiento > 33 ? "bg-red-400 border-r border-black" : "bg-green-400 border-r border-black"}>{diasVencimiento}</td>
                        <td >{importe}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </section>
        </>
  }
  </div>
  )
}

export default App