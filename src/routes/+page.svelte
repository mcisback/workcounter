<script>
    let name = ''
    let started = false

    let hours = 0
    let minutes = 0
    let seconds = 0

    let count = 0

    let interval = null

    const start = () => {
        let date = new Date()

        started = !started

        console.log('Starting counter for: ', name, date)

        interval = setInterval(() => {
            seconds = count % 60
            minutes = Math.floor(count / 60)
            hours = Math.floor(count / (60 * 60))

            count++

            console.log(hours, minutes, seconds, count)
        }, 100)
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

        <button on:click={start}>
            {#if started === false}
                Start Work
            {:else}
                Stop
            {/if}
        </button>

    </div>

    {#if started === true && name !==''}
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