<script lang="ts">

    let className : string  = "";

    export let about : string;
    export  { className as class };
</script>
<section class={"px-[100px]" + " " + className } about={about}>
    <slot />
    
</section>