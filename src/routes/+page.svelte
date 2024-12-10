<script lang="ts">
  export let data;
</script>

<h1>Plugin test</h1>

<h2>Test 1</h2>

<p>Should be: [&lcub;"query":"SELECT * FROM table1 WHERE id = 'abcd'"&rcub;]</p>
<p>Is: {JSON.stringify(data.result)}</p>