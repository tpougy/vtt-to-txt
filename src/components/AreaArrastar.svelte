<script lang="ts">
  interface Props {
    aoCarregar: (arquivo: File) => void;
  }

  const { aoCarregar }: Props = $props();

  let arrastando = $state(false);
  let nomeArquivo = $state('');
  let erro = $state('');
  let inputRef = $state<HTMLInputElement | null>(null);

  function validarEProcessar(arquivo: File): void {
    erro = '';
    if (!arquivo.name.endsWith('.vtt')) {
      erro = 'Por favor, envie apenas arquivos .vtt';
      return;
    }
    nomeArquivo = arquivo.name;
    aoCarregar(arquivo);
  }

  function aoSoltar(evento: DragEvent): void {
    evento.preventDefault();
    arrastando = false;
    const arquivo = evento.dataTransfer?.files[0];
    if (arquivo) validarEProcessar(arquivo);
  }

  function aoArrastarSobre(evento: DragEvent): void {
    evento.preventDefault();
    arrastando = true;
  }

  function aoArrastarSair(): void {
    arrastando = false;
  }

  function aoSelecionarArquivo(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    if (arquivo) validarEProcessar(arquivo);
  }

  function aoClicar(): void {
    inputRef?.click();
  }
</script>

<div
  role="button"
  tabindex="0"
  class="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
    {arrastando ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}"
  ondrop={aoSoltar}
  ondragover={aoArrastarSobre}
  ondragleave={aoArrastarSair}
  onclick={aoClicar}
  onkeydown={(e) => e.key === 'Enter' && aoClicar()}
>
  <input
    bind:this={inputRef}
    type="file"
    accept=".vtt"
    class="hidden"
    onchange={aoSelecionarArquivo}
  />

  {#if nomeArquivo}
    <p class="text-blue-600 font-medium text-lg">📄 {nomeArquivo}</p>
    <p class="text-gray-400 text-sm mt-1">Clique para trocar o arquivo</p>
  {:else}
    <p class="text-gray-500 text-lg">Arraste um arquivo <span class="font-semibold text-gray-700">.vtt</span> aqui</p>
    <p class="text-gray-400 text-sm mt-1">ou clique para selecionar</p>
  {/if}

  {#if erro}
    <p class="text-red-500 text-sm mt-3">{erro}</p>
  {/if}
</div>
