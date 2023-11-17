import "../../src/index.css"
import arrowUp from "../assets/arrow-up-solid.svg"
import arrowDown from "../assets/arrow-down-long-solid.svg"

const Payments = ({ currency, totalPayValue, value, payOnTime, overdueTotalPay } : {currency: string, totalPayValue: number, value: number, payOnTime: number, overdueTotalPay: number}) => {
  return (
    <>
    <div className="paymentComponent" key={currency}>
        <h2 className="paymentCurrency">{currency}</h2>
        <p className="totalPay">${(totalPayValue / value).toFixed(2)}</p>
        <div className="containerPerCurrency">
        <div className="paymentDisplay payOnTime">
            <div className="percentageDisplay">
            <img src={arrowUp} alt="" className="arrowImage"/>
            <p>{(payOnTime * 100 / totalPayValue).toFixed(2)}%</p>
            </div>
            <p className="percentTotal">${(payOnTime / value ).toFixed(2)}</p>
        </div>
        <div className="paymentDisplay payOverdue">
            <div className="percentageDisplay">
            <img src={arrowDown} alt="" className="arrowImage"/>
            <p className="">{(overdueTotalPay * 100 / totalPayValue).toFixed(2)}%</p>
            </div>
            <p className="percentTotal">${(overdueTotalPay / value).toFixed(2)}</p>
        </div>
        </div>
    </div>
    </>
  )
}

export default Payments