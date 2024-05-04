<script>
    // @ts-nocheck
    // import { onMount } from 'svelte';
    import axios from 'axios'

    let name = ''
    let started = false

    let hours = 0
    let minutes = 0
    let seconds = 0

    let count = 0

    let startDate = null

    /**
	 * @type {number | null | undefined}
	 */
    let interval = null

    // onMount(async () => {
	// 	const records = await fetch(`/tutorial/api/album`);
	// 	photos = await res.json();
	// });

    let records = []

    const getRecords = () => {
        axios.get(`/api/getcounterbyuser`, {
            params: {
                name
            }
        })
        .then(response => {
            records = [...response.data.records]
        })

        console.log(`Got records for user ${name}: `, records)
    }

    const toggleCounter = async () => {
        if(name === '') {
            alert("Missing name");

            return;
        }

        started = !started

        if(started === true) {
            startDate = new Date()
            seconds = 0
            minutes = 0
            hours = 0

            console.log('Starting counter for: ', name, startDate)

            interval = setInterval(() => {
                seconds = count % 60
                minutes = Math.floor(count / 60)
                hours = Math.floor(count / (60 * 60))

                if(minutes >= 60) {
                    minutes %= 60
                }

                if(hours >= 24) {
                    hours %= 24
                }

                count++

                //console.log(hours, minutes, seconds, count)
            }, 1000)
        } else {
            // @ts-ignore
            clearInterval(interval)

            axios.post('/api/savecounter', {
                name,
                startDate,
                endDate: new Date(),
                hours,
                minutes,
                seconds,
            })
            .then(response => {
                // Trattamento del risultato positivo
                console.log('Response:', response.data);
            })
            .catch(error => {
                // Trattamento di errori
                console.error('Error saving counter:', error);
            });
        }

        getRecords()
    }
</script>

<div id="main" class="container">
    <div class="row mb-3">
        <h1>Employee / Collaborator Work Counter</h1>
    </div>

    <div class="row mb-3 mt-3">
        <div class="col-6 text-center">
            <h2>
                {#if !started}
                    Enter Name
                {:else}
                    Welcome {name}
                {/if}
            </h2>
        </div>
        <div class="col-6">
            <input type="text" name="name" id="name" bind:value={name}>
        </div>
    </div>

    <div class="row mb-4">

        <button on:click={toggleCounter}>
            {#if started === false}
                Start Work
            {:else}
                Stop
            {/if}
        </button>

    </div>

    {#if name !==''}
        <div class="row counter">
            <div class="col-4">
                {hours}
            </div>
            <div class="col-4">
                {minutes}
            </div>
            <div class="col-4">
                {seconds}
            </div>
        </div>

        <div class="row counter">
            <div class="col-4">
                H
            </div>
            <div class="col-4">
                M
            </div>
            <div class="col-4">
                S
            </div>
        </div>
    {/if}

    {#if records.length > 0}
        <div class="row mb-3">
            <div class="col">Name</div>
            <div class="col">StartDate</div>
            <div class="col">EndDate</div>
            <div class="col">Time</div>
        </div>

        {#each records as {name, startDate, endDate, hours, minutes, seconds}}
            <div class="row">
                <div class="col">{name}</div>
                <div class="col">{startDate}</div>
                <div class="col">{endDate}</div>
                <div class="col">
                    {hours} : {minutes} : {seconds}
                </div>
            </div>
        {/each}
    {:else}
            <b>No records yet for this user</b>
    {/if}
</div>

<style>
    #main {
        padding: 4rem;
    }

    .counter {
        font-size: 4rem;
        text-align: center;
    }
</style>