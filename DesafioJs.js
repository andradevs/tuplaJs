

var facts = [
    ['gabriel', 'endereço', 'av rio branco, 109', true],
    ['joão', 'endereço', 'rua alice, 10', true],
    ['joão', 'endereço', 'rua bob, 88', true],
    ['joão', 'telefone', '234-5678', true],
    ['joão', 'telefone', '91234-5555', true],
    ['joão', 'telefone', '234-5678', false],
    ['gabriel', 'telefone', '98888-1111', true],
    ['gabriel', 'telefone', '56789-1010', true],
];


var schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];


function removeFact(facts) {
    return facts.filter(fact => fact.includes(false))
    
}

function filterEntities(facts){
     return facts.reduce((acc, entity) =>{
        if(!acc.includes(entity[0])){
            acc = [...acc, entity[0]]
        }
        return acc
    },[])
}

function getActualFacts(facts, schema){
    let data = []
    let removedFact = removeFact(facts)
    const entities = filterEntities(facts)
    let result = []

    if (removeFact.length > 0) {
        removedFact.forEach(removed => {
            data = facts.filter(fact => fact[2] !== removed[2])
        });
    }

    schema.map(schem =>{
        if(schem[2] === 'one'){
            entities.forEach(e => {
                result.push(
                    data.filter(fact => fact.includes(schem[0]))
                        .filter(fact => fact.includes(e))
                        .slice(-1)[0]
                    )
            });
        } else{ 
            result = result.concat(data.filter(fact => fact.includes(schem[0])))
        }
    })

    return result

}



let teste = ['joão', 'endereço', 'rua bob, 88', false]

console.log(getActualFacts(facts, schema))

// const entities = filterEntities(facts)

// console.log(facts.includes(entities))