import { createEffect, createSignal } from 'solid-js';

const index = () => {
    const [outputs, setOutputs] = createSignal(["your output will go here!"]);
    const [key, setKey] = createSignal("");
    let inputKey;
    let inputData;
    const create = async (a, b) => {
        const data = {
            value: b,
            key: a
        }
        console.log(data);
        const response = await fetch(`http://localhost:3001/data/create/` ,{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    };
    const read = async (a) => {
        const response = await fetch(`http://localhost:3001/data/read/${a}` ,{
            method: "GET",
        }).then(response => response.json());
        console.log(response);
        setOutputs([]);
        response.forEach( item => {
            setOutputs([...outputs(), item]);
        });
    };
    const update = async (a, b) => {
        const data = {
            value: b,
            key: a
        };
        const response = await fetch(`http://localhost:3001/data/update/` ,{
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json());
        console.log(response);
    };
    const remove = async (a) => {
        const response = await fetch(`http://localhost:3001/data/remove/${a}` ,{
          method: "DELETE",
        }).then(response => response.json());
        console.log(response);
    };
    return (
        <div class="flex flex-row h-screen">
            <div class="w-3/12 bg-white flex items-center justify-center">
                <div class="flex flex-col bg-white w-4/12 space-y-3 items-center">
                    <button onClick={() =>{create(inputKey.value, inputData.value)}}class="bg-gray-200 w-20 h-20 rounded-md border-2 border-stone-600"> 
                        <p class="font-mono text-xl">c</p>
                     </button>
                    <button onClick={() =>{read(inputKey.value)}}class="bg-gray-200 w-20 h-20 rounded-md border-2 border-stone-600"> 
                        <p class="font-mono text-xl">r</p>
                     </button>
                    <button onClick={() =>{update(inputKey.value, inputData.value)}}class="bg-gray-200 w-20 h-20 rounded-md border-2 border-stone-600"> 
                        <p class="font-mono text-xl">u</p>
                     </button>
                    <button onClick={() =>{remove(inputKey.value)}}class="bg-gray-200 w-20 h-20 rounded-md border-2 border-stone-600"> 
                        <p class="font-mono text-xl">d</p>
                     </button>
                </div>
            </div>
            <div class="w-9/12 bg-white flex items-center justify-center flex-col">
                <div class="flex flex-row w-11/12 justify-around">
                    <div class="flex flex-col bg-white w-5/12 min-w-fit max-w-xs">
                        <h1 class="font-mono text-xl self-center mb-1.5">key</h1>
                        <input ref={inputKey} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"></input>
                    </div>
                    <div class="flex flex-col bg-white w-5/12 min-w-fit max-w-xs">
                        <h1 class="font-mono text-xl self-center mb-1.5">value</h1>
                        <input ref={inputData} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"></input>
                    </div>
                </div>
                <div class="flex flex-col bg-gray-100 w-9/12 justify-around min-h-min max-h-96 my-6 rounded-lg border-2 border-stone-400">
                    <For each={outputs()}>{(output, i) => 
                    <ul>
                        <li><p class="font-mono text-md m-5 "> {output.value}</p></li>
                    </ul>
                    }</For>
                </div>
            </div>
        </div>
    )
}

export default index;