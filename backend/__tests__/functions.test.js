import {sum} from '../src/functions'

describe('sum', ()=>{
    test('case:',()=>{

        const actualValue =  sum(3,1);
        expect(actualValue).toEqual(4)
    })
}) 