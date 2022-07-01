export default function formatValue (valueRoot) {
    const value = (valueRoot.toFixed(2)).replace('.', ',')
    let aux = 0;
    let newValue = value.slice(-3)

    if (value[0] !== '-') {
        for (let i = value.length - 4; i >= 0; i--) {
            aux++
            if (aux === 3 && i !== 0) {
                aux = 0;
                newValue =  '.' + value[i] + newValue
            } else {
                newValue = value[i] + newValue
            }
        }
    } else {
        for (let i = value.length - 4; i > 0; i--) {
            aux++
            if (aux === 3 && i !== 1) {
                aux = 0;
                newValue =  '.' + value[i] + newValue
            } else {
                newValue = value[i] + newValue
            }
        }
        newValue = '-' + newValue;
    }
    return newValue;
}