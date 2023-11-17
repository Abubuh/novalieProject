import "./index.css"
import { useEffect, useState } from "react"
import arrowUp from "../public/arrow-up-solid.svg"
import arrowDown from "../public/arrow-down-long-solid.svg"
import { Office } from "./types"

const VALUES = [
  {
     currency: "Pesos",
     value: 1,
  },
  {
     currency: "Dolares",
     value: .058,
  },
  {
     currency: "Euro",
     value: 0.053,
  },
]

const ALL_OFFICES = 'All'


function App() {
  const [offices, setOffices] = useState<Office[]>([])
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
    
  useEffect(() => {
    const fetchPagosData = () => {
      fetch('http://localhost:3001/pagos')
      .then(res => res.json())
      .then(data => setOffices(data.data))
    }
    fetchPagosData()
  },[])

  const handleCurrentOffice = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.target.value
    setCurrentOffice(currentValue)  
  }

  return (
  <div className="bg-amber-50 h-[100vh] px-7">
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
    <section className="mb-10">
      <div className="grid grid-cols-3 gap-16 text-center">
        {
          VALUES.map(({currency: currency, value}) => {
            return (
              <div className="border-2 border-black px-3 rounded-md" key={currency}>
                  <h2 className="text-left text-2xl py-3">{currency}</h2>
                  <p className="text-center text-3xl mb-5">${(totalPayValue * value).toFixed(2)}</p>
                  <div className="grid gap-7 grid-cols-2 text-2xl mb-4">
                    <div className="text-blue-600 font-medium	">
                      <div className="flex justify-center">
                      <img src={arrowUp} alt="" className="w-1/12 mr-1"/>
                        <p>{(payOnTime * 100 / totalPayValue).toFixed(2)}%</p>
                      </div>
                      <p>${(payOnTime * value ).toFixed(2)}</p>
                    </div>
                    <div className="text-red-800 font-medium	">
                      <div className="flex justify-center">
                      <img src={arrowDown} alt="" className="w-1/12 mr-1"/>
                      <p className="">{(overdueTotalPay * 100 / totalPayValue).toFixed(2)}%</p>
                      </div>
                      <p >${(overdueTotalPay * value).toFixed(2)}</p>
                    </div>
                  </div>
              </div>
            )
          })
        }
      </div>
    </section>
    <section>
      <table className="w-full border border-collapse border-black text-center">
        <thead>
          <tr>
            <th className="border border-black">Fianza</th>
            <th className="border border-black">Movimiento</th>
            <th className="border border-black">Fiado</th>
            <th className="border border-black">Antiguedad</th>
            <th className="border border-black">Dias de vencimiento</th>
            <th className="border border-black">Importe</th>
          </tr>
        </thead>
        <tbody>
          {
            filterOffices.map(({fianza, movimiento, fiado, antiguedad, diasVencimiento, importe }) => {
              return (
                <tr key={fianza} className="border border-black">
                  <td className="border border-black">{fianza}</td>
                  <td className="border border-black">{movimiento}</td>
                  <td className="border border-black">{fiado}</td>
                  <td className="border border-black">{antiguedad}</td>
                  <td className={diasVencimiento > 33 ? "bg-red-400" : "bg-green-400 "}>{diasVencimiento}</td>
                  <td className="border border-black">{importe}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  </div>
  )
}

export default App