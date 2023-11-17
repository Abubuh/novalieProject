import arrowUp from "../assets/arrow-up-solid.svg"
import arrowDown from "../assets/arrow-down-long-solid.svg"

const Payments = ({ currency, totalPayValue, value, payOnTime, overdueTotalPay } : {currency: string, totalPayValue: number, value: number, payOnTime: number, overdueTotalPay: number}) => {
  return (
    <>
    <div className="border-2 border-black px-3 rounded-md" key={currency}>
        <h2 className="text-left text-2xl py-3">{currency}</h2>
        <p className="text-center text-3xl mb-5">${(totalPayValue / value).toFixed(2)}</p>
        <div className="grid gap-7 grid-cols-2 text-2xl mb-4">
        <div className="text-blue-600 font-medium	">
            <div className="flex justify-center">
            <img src={arrowUp} alt="" className="w-1/12 mr-1"/>
            <p>{(payOnTime * 100 / totalPayValue).toFixed(2)}%</p>
            </div>
            <p>${(payOnTime / value ).toFixed(2)}</p>
        </div>
        <div className="text-red-800 font-medium	">
            <div className="flex justify-center">
            <img src={arrowDown} alt="" className="w-1/12 mr-1"/>
            <p className="">{(overdueTotalPay * 100 / totalPayValue).toFixed(2)}%</p>
            </div>
            <p >${(overdueTotalPay / value).toFixed(2)}</p>
        </div>
        </div>
    </div>
    </>
  )
}

export default Payments