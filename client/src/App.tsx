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
  <div className="appBody">
    <h1>Prima por cobrar</h1>
    <section className="inputContainer">
        <select name="" id="" onChange={handleCurrentOffice}>
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
        <p className="noDataFound">No se encontro informacion</p> :
        <>
          <section className="paymentSection">
            <div className="paymentContainers">
              {
                VALUES.map(({currency: currency, value}) => {
                  return (
                    <Payments currency={currency} totalPayValue={totalPayValue} value={value} payOnTime={payOnTime} overdueTotalPay={overdueTotalPay}/>
                  )
                })
              }
            </div>
          </section>
          <section className="tableSection">
            <table >
              <thead>
                <tr className="headerRow">
                  <th>Fianza</th>
                  <th>Movimiento</th>
                  <th>Fiado</th>
                  <th>Antiguedad</th>
                  <th>Dias de vencimiento</th>
                  <th >Importe</th>
                </tr>
              </thead>
              <tbody className="dataRows">
                {
                  filterOffices.map(({fianza, movimiento, fiado, antiguedad, diasVencimiento, importe, id }) => {
                    return (
                      <tr key={id}>
                        <td>{fianza}</td>
                        <td>{movimiento}</td>
                        <td>{fiado}</td>
                        <td>{antiguedad}</td>
                        <td className={diasVencimiento > 33 ? "overduePayment" : "paymentOnTime"}>{diasVencimiento}</td>
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