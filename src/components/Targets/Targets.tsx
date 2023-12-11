import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';
import './Targets.css'

const Targets = () => {


    const [data, setData] = React.useState<any>(null)
  
    const getData = async () => {
      let temp = [
        {
          "name": "Calories",
          "value": 2000,
          "unit": "kcal",
          "goal": 2500,
          "goalUnit": "kcal"
        },
        {
          "name": "Sleep",
          "value": 8,
          "unit": "hrs",
          "goal": 8,
          "goalUnit": "hrs"
        },
        {
          "name": "Steps",
          "value": 50,
          "unit": "steps",
          "goal": 10000,
          "goalUnit": "steps"
        },
        {
          "name": "Water",
          "value": 2000,
          "unit": "ml",
          "goal": 3000,
          "goalUnit": "ml"
        },
      
      ]
      setData(temp)
      console.log(temp)
    }
  
    React.useEffect(() => {
      getData()
    }, [])
  
    function simplifyFraction(numerator: number, denominator: number): [number, number] {
      function gcd(a: number, b: number): number {
        return b === 0 ? a : gcd(b, a % b);
      }
      const commonDivisor: number = gcd(numerator, denominator);
  
      // Simplify the fraction
      const simplifiedNumerator: number = numerator / commonDivisor;
      const simplifiedDenominator: number = denominator / commonDivisor;
  
      return [simplifiedNumerator, simplifiedDenominator];
  
    }
    return (
      <div className='measurement'>
  
        {
          data?.length > 0 && data.map((item: any, index: number) => {
            return (
              <div className='card' key={index}>
                <div className='card-header'>
                  <div className='card-header-box'>
                    <div className='card-header-box-name'>{item.name}</div>
                    <div className='card-header-box-value'>{item.value} {item.unit}</div>
                  </div>
                  <div className='card-header-box'>
                    <div className='card-header-box-name'>Target</div>
                    <div className='card-header-box-value'>{item.goal} {item.goalUnit}</div>
                  </div>
                </div>
  
                <CircularProgress
                  color="primary"
                  determinate
                  variant="solid"
                  size="lg"
                  value={
                    (item.value / item.goal) * 100
                  }
                >
                  <span className='textincircle'>
                    {
                      simplifyFraction(item.value, item.goal)[0] + ' / ' + simplifyFraction(item.value, item.goal)[1]
                    }
                  </span>
                </CircularProgress>
  
                <button
                 onClick={() => {
                  window.location.href = `/results/${item.name}`
                }}
                >Get results</button>
  
              </div>
            )
          })
        }
      </div>
    )
  }
  
export default Targets