"use strict";
// Considere um modelo de informação, onde um registro é representado por uma "tupla".
// Uma tupla (ou lista) nesse contexto é chamado de fato.

// Exemplo de um fato:
// ('joão', 'idade', 18, true)

// Nessa representação, a entidade 'joão' tem o atributo 'idade' com o valor '18'.

// Para indicar a remoção (ou retração) de uma informação, o quarto elemento da tupla pode ser 'false'
// para representar que a entidade não tem mais aquele valor associado aquele atributo.


// Como é comum em um modelo de entidades, os atributos de uma entidade pode ter cardinalidade 1 ou N (muitos).

// Segue um exemplo de fatos no formato de tuplas (E, A, V, added?)
// i.e. [entidade, atributo, valor, booleano indica se fato foi adicionado ou retraido)

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

// Vamos assumir que essa lista de fatos está ordenada dos mais antigos para os mais recentes.

// Nesse schema,
// o atributo 'telefone' tem cardinalidade 'muitos' (one-to-many), e 'endereço' é 'one-to-one'.
var schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];


// Nesse exemplo, os seguintes registros representam o histórico de endereços que joão já teve:
//  [
//   ['joão', 'endereço', 'rua alice, 10', true]
//   ['joão', 'endereço', 'rua bob, 88', true],
//]
// E o fato considerado vigente é o último.

// O objetivo desse desafio é escrever uma função que retorne quais são os fatos vigentes sobre essas entidades.
// Ou seja, quais são as informações que estão valendo no momento atual.
// A função deve receber `facts` (todos fatos conhecidos) e `schema` como argumentos.

// Resultado esperado para este exemplo (mas não precisa ser nessa ordem):
[
    ['gabriel', 'endereço', 'av rio branco, 109', true],
    ['joão', 'endereço', 'rua bob, 88', true],
    ['joão', 'telefone', '91234-5555', true],
    ['gabriel', 'telefone', '98888-1111', true],
    ['gabriel', 'telefone', '56789-1010', true]
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