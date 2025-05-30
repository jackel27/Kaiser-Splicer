<template>
  <div class="min-h-screen bg-black overflow-hidden">
    <!-- Animated DJ background -->
    <div class="fixed inset-0 overflow-hidden">
      <!-- Gradient orbs -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 grid-pattern opacity-20"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Animated Logo -->
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl animate-pulse"></div>
              <div class="relative w-16 h-16 bg-black rounded-full flex items-center justify-center border-2 border-purple-500">
                <svg class="w-10 h-10 text-white animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-5xl font-black tracking-tighter">
                <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  JackeL's Slice-o-Rama!
                </span>
              </h1>
              <p class="text-gray-400 text-sm uppercase tracking-widest">I put that sh*t on everything</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Stats counter -->
            <div class="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-purple-500/20">
              <FireIcon class="w-5 h-5 text-orange-500 animate-pulse" />
              <span class="text-sm text-gray-400">
                <span class="font-bold text-white">{{ sliceCounter.toLocaleString() }}</span> slices made
              </span>
            </div>
            <button @click="toggleShortcuts" class="p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors" title="Keyboard shortcuts">
              <CommandLineIcon class="w-5 h-5 text-gray-400" />
            </button>
            <button @click="resetAll" class="group relative px-6 py-3 overflow-hidden rounded-lg bg-gray-900 text-white font-medium transition-all hover:bg-gray-800">
              <span class="relative z-10 flex items-center space-x-2">
                <ArrowPathIcon class="w-5 h-5" />
                <span>New Track</span>
              </span>
              <div class="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>
        </div>
      </header>

      <!-- Keyboard Shortcuts Modal -->
      <div v-if="showShortcuts" @click="toggleShortcuts" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div @click.stop class="bg-gray-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 max-w-md w-full">
          <h3 class="text-xl font-bold text-white mb-4">Keyboard Shortcuts</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-gray-800/50 rounded">
              <span class="text-gray-400">Play/Pause</span>
              <kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono">Space</kbd>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-800/50 rounded">
              <span class="text-gray-400">Stop</span>
              <kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono">S</kbd>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-800/50 rounded">
              <span class="text-gray-400">Toggle Loop</span>
              <kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono">L</kbd>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-800/50 rounded">
              <span class="text-gray-400">Export</span>
              <kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono">Ctrl + E</kbd>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-800/50 rounded">
              <span class="text-gray-400">New File</span>
              <kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono">Ctrl + N</kbd>
            </div>
          </div>
        </div>
      </div>

      <!-- File Upload Section -->
      <div v-if="!audioFile" class="relative">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
        <div class="relative bg-gray-900/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-12 shadow-2xl">
          <div 
            @drop="handleDrop"
            @dragover.prevent
            @dragenter.prevent
            @dragleave="isDragging = false"
            @dragenter="isDragging = true"
            :class="[
              'border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300',
              isDragging ? 'border-purple-400 bg-purple-500/10 scale-[1.02]' : 'border-gray-700 hover:border-purple-500/50'
            ]"
          >
            <div class="relative inline-block mb-6">
              <div class="absolute inset-0 bg-purple-600 rounded-full blur-2xl animate-pulse"></div>
              <CloudArrowUpIcon class="relative w-24 h-24 text-purple-400" />
            </div>
            <h2 class="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Drop Your Track
            </h2>
            <p class="text-gray-400 mb-6">MP3, WAV, FLAC, M4A supported</p>
            <input 
              type="file" 
              ref="fileInput" 
              @change="handleFileSelect" 
              accept=".mp3,.wav,.flac,.m4a,audio/*" 
              class="hidden"
            >
            <button @click="$refs.fileInput.click()" class="relative group px-8 py-4 overflow-hidden rounded-lg font-bold text-white">
              <span class="relative z-10">Browse Files</span>
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:scale-105"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Audio Editor Section -->
      <div v-else class="space-y-6">
        <!-- Track Info Card -->
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div class="relative bg-gray-900/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <!-- Animated vinyl record -->
                <div class="relative w-20 h-20">
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-spin-slow"></div>
                  <div class="absolute inset-2 bg-gray-900 rounded-full"></div>
                  <div class="absolute inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-spin-slow"></div>
                  <div class="absolute inset-6 bg-purple-500 rounded-full"></div>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">{{ audioFile.name }}</h3>
                  <div class="flex items-center space-x-4 mt-1">
                    <span class="text-purple-400">{{ formatFileSize(audioFile.size) }}</span>
                    <span class="text-gray-500">•</span>
                    <span class="text-pink-400">{{ audioFormat }}</span>
                    <span v-if="audioFileInfo.codec" class="text-gray-500">•</span>
                    <span v-if="audioFileInfo.codec" class="text-green-400">
                      {{ audioFileInfo.bitDepth }}bit
                      <span v-if="audioFileInfo.bitrate">@ {{ audioFileInfo.bitrate }}kbps</span>
                    </span>
                    <span class="text-gray-500">•</span>
                    <span class="text-cyan-400">{{ formatTime(duration) }}</span>
                    <span v-if="bpm > 0" class="text-gray-500">•</span>
                    <span v-if="bpm > 0" class="text-orange-400 font-bold">{{ bpm }} BPM</span>
                  </div>
                </div>
              </div>
              <button @click="removeFile" class="p-2 rounded-lg hover:bg-red-500/20 transition-colors group">
                <XMarkIcon class="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        <!-- Waveform Visualizer -->
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
          <div class="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl overflow-hidden">
            <!-- Animated background lines -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 opacity-10">
                <div class="absolute h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan"></div>
                <div class="absolute h-px w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-scan" style="animation-delay: 1s; top: 33%"></div>
                <div class="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan" style="animation-delay: 2s; top: 66%"></div>
              </div>
            </div>
            
            <div class="relative">
              <div class="mb-4 flex items-center justify-between">
                <h3 class="text-xl font-bold text-white">Waveform Editor</h3>
                <div class="flex items-center space-x-4">
                  <!-- View mode switcher -->
                  <div class="flex items-center bg-gray-800 rounded-lg p-1">
                    <button 
                      @click="viewMode = 'waveform'"
                      :class="[
                        'px-3 py-1 rounded text-sm font-medium transition-all',
                        viewMode === 'waveform' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      ]"
                    >
                      Waveform
                    </button>
                    <button 
                      @click="viewMode = 'spectrum'"
                      :class="[
                        'px-3 py-1 rounded text-sm font-medium transition-all',
                        viewMode === 'spectrum' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      ]"
                    >
                      Spectrum
                    </button>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-sm text-gray-400">Click & drag to select</span>
                  </div>
                </div>
              </div>
              
              <!-- Spectrum Analyzer (shows when audio is playing) -->
              <div v-if="showSpectrum && isPlaying" class="absolute top-0 left-0 right-0 h-24 z-10">
                <canvas ref="spectrumCanvas" class="w-full h-full opacity-80"></canvas>
              </div>
              
              <!-- Waveform container with glow effect -->
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-pink-600/20 blur-3xl"></div>
                <div ref="waveformContainer" class="relative waveform-container h-64 rounded-lg overflow-hidden"></div>
                <!-- Time marker on hover -->
                <div 
                  v-if="hoverTime !== null" 
                  class="absolute top-0 bottom-0 w-px bg-white/50 pointer-events-none transition-all duration-75"
                  :style="{ left: hoverPosition + 'px' }"
                >
                  <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {{ formatTime(hoverTime) }}
                  </div>
                </div>
              </div>
              
              <!-- Zoom Control with presets -->
              <div class="mt-6 space-y-3">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-2">
                    <MagnifyingGlassMinusIcon class="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    type="range" 
                    v-model="zoomLevel" 
                    @input="updateZoom"
                    min="10" 
                    max="1000" 
                    class="flex-1 h-2 bg-gray-800 rounded-full appearance-none cursor-pointer slider"
                  >
                  <div class="flex items-center space-x-2">
                    <MagnifyingGlassPlusIcon class="w-5 h-5 text-gray-400" />
                    <span class="text-sm text-gray-400 w-12 text-right font-mono">{{ zoomLevel }}x</span>
                  </div>
                </div>
                <!-- Zoom presets -->
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500 uppercase">Quick zoom:</span>
                  <button 
                    v-for="preset in zoomPresets" 
                    :key="preset.value"
                    @click="zoomLevel = preset.value; updateZoom()"
                    class="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                  >
                    {{ preset.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Selection Controls -->
        <div v-if="selectedRegion" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Selection Details -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl"></div>
            <div class="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <ScissorsIcon class="w-6 h-6 text-purple-400" />
                <span>Selection Details</span>
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-purple-500/10">
                  <span class="text-gray-400 flex items-center space-x-2">
                    <PlayIcon class="w-4 h-4" />
                    <span>Start</span>
                  </span>
                  <span class="font-mono text-purple-400 text-lg">{{ formatTime(selectedRegion.start) }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-pink-500/10">
                  <span class="text-gray-400 flex items-center space-x-2">
                    <StopIcon class="w-4 h-4" />
                    <span>End</span>
                  </span>
                  <span class="font-mono text-pink-400 text-lg">{{ formatTime(selectedRegion.end) }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <span class="text-gray-300 flex items-center space-x-2">
                    <ClockIcon class="w-4 h-4" />
                    <span>Duration</span>
                  </span>
                  <span class="font-mono text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-lg font-bold">
                    {{ formatTime(selectedRegion.end - selectedRegion.start) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Controls -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
            <div class="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <SpeakerWaveIcon class="w-6 h-6 text-cyan-400" />
                <span>Preview Selection</span>
              </h3>
              
              <!-- Playback buttons -->
              <div class="flex items-center justify-center space-x-4 mb-6">
                <button 
                  @click="playSelection" 
                  class="group relative p-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all duration-300"
                >
                  <PlayIcon v-if="!isPlaying" class="w-10 h-10 text-white" />
                  <PauseIcon v-else class="w-10 h-10 text-white" />
                  <div class="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </button>
                <button 
                  @click="stopPlayback" 
                  class="p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                >
                  <StopIcon class="w-6 h-6 text-gray-300" />
                </button>
              </div>
              
              <!-- Visual feedback -->
              <div class="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  v-if="isPlaying" 
                  class="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-100"
                  :style="{ width: playbackProgress + '%' }"
                ></div>
              </div>
              
              <!-- Loop toggle -->
              <div class="mt-4 flex items-center justify-center space-x-2">
                <button
                  @click="toggleLoop"
                  :class="[
                    'px-4 py-2 rounded-lg flex items-center space-x-2 transition-all',
                    loopEnabled 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  ]"
                >
                  <ArrowPathIcon class="w-4 h-4" />
                  <span class="text-sm font-medium">Loop</span>
                </button>
              </div>
              
              <p class="text-center text-gray-400 text-sm mt-2">
                {{ isPlaying ? 'Playing selection...' : 'Click play to preview' }}
                {{ loopEnabled && isPlaying ? ' (looping)' : '' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Export Panel -->
        <div v-if="selectedRegion" class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-2xl blur-2xl"></div>
          <div class="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
            <h3 class="text-2xl font-bold text-white mb-6 text-center">Export Settings</h3>
            
            <!-- Preserve Original Quality Toggle -->
            <div class="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl border-2 border-green-500/50 hover:border-green-400/70 transition-all">
              <label class="flex items-center justify-between cursor-pointer group">
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <ShieldCheckIcon class="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                    <div class="absolute inset-0 bg-green-400/20 blur-xl"></div>
                  </div>
                  <div>
                    <span class="text-xl font-bold text-white">Preserve Original Quality</span>
                    <p class="text-sm text-gray-300 mt-1">
                      Binary slice - 100% identical to source 
                      <span class="text-green-400 font-semibold">(WAV only)</span>
                    </p>
                  </div>
                </div>
                <div class="relative">
                  <input 
                    type="checkbox" 
                    v-model="preserveOriginal" 
                    class="sr-only peer"
                  >
                  <div class="w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </div>
              </label>
              <div v-if="preserveOriginal" class="mt-4 text-sm text-green-300 bg-green-900/30 p-3 rounded-lg">
                <div v-if="audioFileInfo.codec === 'mp3'">
                  ✅ Binary mode active - Will export as <span class="font-bold">MP3</span> ({{ audioFileInfo.bitrate || 320 }}kbps)
                  <div class="mt-2 text-xs text-orange-300">
                    ⚠️ MP3 slicing may re-encode due to frame boundaries. For 100% quality, use WAV source.
                  </div>
                </div>
                <div v-else-if="audioFileInfo.codec?.includes('wav')">
                  ✅ Binary mode active - Will export as <span class="font-bold">WAV</span> ({{ audioFileInfo.bitDepth }}bit)
                </div>
                <div v-else>
                  ⚠️ Binary mode active - Format: <span class="font-bold">{{ audioFileInfo.codec || 'Unknown' }}</span>
                </div>
              </div>
            </div>
            
            <div :class="[
              'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-all duration-300',
              preserveOriginal ? 'opacity-30 pointer-events-none' : ''
            ]">
              <!-- Format Selection -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-purple-400 uppercase tracking-wider">Format</label>
                <select v-model="exportFormat" class="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all">
                  <option value="wav">WAV - Lossless</option>
                  <option value="flac">FLAC - Lossless Compressed</option>
                  <option value="mp3">MP3 - Compressed</option>
                </select>
              </div>

              <!-- Quality Settings -->
              <div v-if="exportFormat === 'mp3'" class="space-y-2">
                <label class="text-sm font-medium text-pink-400 uppercase tracking-wider">MP3 Bitrate</label>
                <select v-model="mp3Bitrate" class="w-full px-4 py-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all">
                  <option value="320">320 kbps (Maximum Standard)</option>
                  <option value="256">256 kbps (Very High)</option>
                  <option value="192">192 kbps (High)</option>
                  <option value="128">128 kbps (Standard)</option>
                  <option value="96">96 kbps (Low)</option>
                </select>
                <p class="text-xs text-gray-500 mt-1">Note: 320 kbps is the maximum for MP3 format</p>
              </div>

              <!-- Sample Rate -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-cyan-400 uppercase tracking-wider">Sample Rate</label>
                <select v-model="sampleRate" class="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all">
                  <option value="original">Original ({{ originalSampleRate }} Hz)</option>
                  <option value="44100">44,100 Hz (CD Quality)</option>
                  <option value="48000">48,000 Hz (Standard)</option>
                  <option value="88200">88,200 Hz (2x CD)</option>
                  <option value="96000">96,000 Hz (Studio)</option>
                  <option value="176400">176,400 Hz (4x CD)</option>
                  <option value="192000">192,000 Hz (Pro Studio)</option>
                  <option value="352800">352,800 Hz (DXD)</option>
                  <option value="384000">384,000 Hz (Ultra HD)</option>
                  <option value="768000">768,000 Hz (Maximum)</option>
                </select>
              </div>

              <!-- Bit Depth -->
              <div v-if="exportFormat !== 'mp3'" class="space-y-2">
                <label class="text-sm font-medium text-purple-400 uppercase tracking-wider">Bit Depth</label>
                <select v-model="bitDepth" class="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all">
                  <option value="original">Original Quality</option>
                  <option value="8">8-bit (Retro/LoFi)</option>
                  <option value="16">16-bit (CD Quality)</option>
                  <option value="24">24-bit (Studio)</option>
                  <option value="32">32-bit Float (Maximum)</option>
                  <option value="64">64-bit Float (Extreme)</option>
                </select>
                <p v-if="bitDepth === '8'" class="text-xs text-orange-400 mt-1">⚠️ 8-bit will create a retro/degraded sound</p>
                <p v-else-if="bitDepth === '64'" class="text-xs text-cyan-400 mt-1">🚀 64-bit is overkill but why not!</p>
              </div>
            </div>

            <!-- Fade Options -->
            <div :class="[
              'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-all duration-300',
              preserveOriginal ? 'opacity-30 pointer-events-none' : ''
            ]">
              <div class="space-y-2">
                <label class="text-sm font-medium text-orange-400 uppercase tracking-wider">Fade In</label>
                <select v-model="fadeIn" class="w-full px-4 py-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all">
                  <option value="0">None</option>
                  <option value="0.1">0.1s</option>
                  <option value="0.25">0.25s</option>
                  <option value="0.5">0.5s</option>
                  <option value="1">1s</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-orange-400 uppercase tracking-wider">Fade Out</label>
                <select v-model="fadeOut" class="w-full px-4 py-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all">
                  <option value="0">None</option>
                  <option value="0.1">0.1s</option>
                  <option value="0.25">0.25s</option>
                  <option value="0.5">0.5s</option>
                  <option value="1">1s</option>
                </select>
              </div>
            </div>

            <!-- File Name -->
            <div class="mb-8 space-y-2">
              <label class="text-sm font-medium text-gray-400 uppercase tracking-wider">Output Name</label>
              <input 
                v-model="outputFileName" 
                type="text" 
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
                placeholder="Enter file name"
              >
            </div>

            <!-- Export Button -->
            <button 
              @click="exportSelection" 
              :disabled="isExporting || !selectedRegion"
              class="relative w-full group overflow-hidden rounded-lg py-4 font-bold text-white text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="relative z-10 flex items-center justify-center space-x-3">
                <ArrowDownTrayIcon class="w-6 h-6" />
                <span>{{ isExporting ? 'Exporting...' : 'Export Selection' }}</span>
                <span v-if="preserveOriginal" class="text-green-400 text-sm">
                  ({{ audioFileInfo.codec === 'mp3' ? 'MP3' : audioFileInfo.codec?.includes('wav') ? 'WAV' : 'Original' }} Preserved)
                </span>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 transition-all duration-300"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </button>
            
            <!-- Debug Mode -->
            <div v-if="false" class="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" class="w-4 h-4">
                <span class="text-red-400 font-bold">FUCK IT MODE - Raw byte slice (may break playback)</span>
              </label>
            </div>

            <!-- Format Info -->
            <div class="mt-4 p-4 bg-gray-800/30 rounded-lg">
              <div class="flex items-start space-x-2">
                <InformationCircleIcon class="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div class="text-sm text-gray-400">
                  <p v-if="preserveOriginal && audioFileInfo.codec === 'mp3'">
                    <span class="text-green-400 font-semibold">MP3 Preservation:</span> Direct copy at original {{ audioFileInfo.bitrate || 320 }}kbps bitrate.
                  </p>
                  <p v-else-if="preserveOriginal && audioFileInfo.codec?.includes('wav')">
                    <span class="text-green-400 font-semibold">Binary Slice Mode:</span> Direct byte copy - 100% identical to original.
                  </p>
                  <p v-else-if="preserveOriginal">
                    <span class="text-orange-400 font-semibold">Note:</span> Preserving original {{ audioFileInfo.codec || audioFormat }} format.
                  </p>
                  <p v-else-if="exportFormat === 'wav'">
                    <span class="text-green-400 font-semibold">WAV Export:</span> Uncompressed, highest quality. 
                    <span v-if="parseInt(sampleRate) >= 192000" class="text-cyan-400">Ultra HD audio selected!</span>
                    <span v-else-if="parseInt(sampleRate) >= 96000" class="text-cyan-400">Hi-Res audio selected!</span>
                  </p>
                  <p v-else-if="exportFormat === 'flac'">
                    <span class="text-blue-400 font-semibold">FLAC Note:</span> Browser limitation - exports as 24-bit WAV. Use FFmpeg or online converters for true FLAC.
                  </p>
                  <p v-else>
                    <span class="text-green-400 font-semibold">MP3 Export:</span> Direct encoding at {{ mp3Bitrate }}kbps. High-quality compression for sharing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl animate-pulse"></div>
        <div class="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
          <div class="flex flex-col items-center">
            <!-- Custom loading animation -->
            <div class="relative w-32 h-32 mb-6">
              <!-- Vinyl record animation -->
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-spin"></div>
              <div class="absolute inset-2 bg-gray-900 rounded-full"></div>
              <div class="absolute inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-spin"></div>
              <div class="absolute inset-8 bg-gray-800 rounded-full"></div>
              <div class="absolute inset-10 bg-pink-600 rounded-full"></div>
              
              <!-- EQ bars -->
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end space-x-1">
                <div class="w-1 bg-purple-400 rounded-full animate-eq-bar" style="height: 20px; animation-delay: 0ms;"></div>
                <div class="w-1 bg-pink-400 rounded-full animate-eq-bar" style="height: 16px; animation-delay: 100ms;"></div>
                <div class="w-1 bg-cyan-400 rounded-full animate-eq-bar" style="height: 24px; animation-delay: 200ms;"></div>
                <div class="w-1 bg-purple-400 rounded-full animate-eq-bar" style="height: 18px; animation-delay: 300ms;"></div>
                <div class="w-1 bg-pink-400 rounded-full animate-eq-bar" style="height: 22px; animation-delay: 400ms;"></div>
              </div>
            </div>
            <p class="text-lg text-white font-medium animate-pulse">{{ loadingMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'
import { saveAs } from 'file-saver'
import {
  CloudArrowUpIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  ScissorsIcon,
  SpeakerWaveIcon,
  ClockIcon,
  CommandLineIcon,
  FireIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'App',
  components: {
    CloudArrowUpIcon,
    XMarkIcon,
    PlayIcon,
    PauseIcon,
    StopIcon,
    ArrowDownTrayIcon,
    ArrowPathIcon,
    InformationCircleIcon,
    MagnifyingGlassMinusIcon,
    MagnifyingGlassPlusIcon,
    ScissorsIcon,
    SpeakerWaveIcon,
    ClockIcon,
    CommandLineIcon,
    FireIcon,
    ShieldCheckIcon
  },
  setup() {
    const waveformContainer = ref(null)
    const spectrumCanvas = ref(null)
    const fileInput = ref(null)
    const audioFile = ref(null)
    const originalFileBlob = ref(null)
    const audioFileInfo = ref({
      codec: '',
      bitrate: 0,
      bitDepth: 16,
      channels: 2,
      originalFormat: ''
    })
    const wavesurfer = ref(null)
    const regionsPlugin = ref(null)
    const selectedRegion = ref(null)
    const isPlaying = ref(false)
    const currentTime = ref(0)
    const duration = ref(0)
    const zoomLevel = ref(50)
    const isLoading = ref(false)
    const loadingMessage = ref('')
    const exportFormat = ref('wav')
    const mp3Bitrate = ref('320')
    const sampleRate = ref('original')
    const bitDepth = ref('original')
    const isExporting = ref(false)
    const originalSampleRate = ref(44100)
    const outputFileName = ref('')
    const audioBuffer = ref(null)
    const isDragging = ref(false)
    const playbackProgress = ref(0)
    const playbackInterval = ref(null)
    const loopEnabled = ref(false)
    const showShortcuts = ref(false)
    const viewMode = ref('waveform')
    const showSpectrum = ref(true)
    const hoverTime = ref(null)
    const hoverPosition = ref(null)
    const bpm = ref(0)
    const sliceCounter = ref(42069)
    const fadeIn = ref('0')
    const fadeOut = ref('0')
    const preserveOriginal = ref(true)
    const audioContext = ref(null)
    const analyser = ref(null)
    const animationFrame = ref(null)

    const zoomPresets = [
      { label: 'Full', value: 10 },
      { label: '16 bars', value: 50 },
      { label: '8 bars', value: 100 },
      { label: '4 bars', value: 200 },
      { label: '1 bar', value: 500 },
    ]

    const audioFormat = computed(() => {
      if (!audioFile.value) return ''
      const ext = audioFile.value.name.split('.').pop().toUpperCase()
      return ext
    })

    // Generate default output filename
    watch(audioFile, (newFile) => {
      if (newFile) {
        const baseName = newFile.name.replace(/\.[^/.]+$/, '')
        outputFileName.value = `${baseName}_splice`
      }
    })

    // Keyboard shortcuts
    const handleKeyboard = (e) => {
      if (!audioFile.value) return

      switch(e.key.toLowerCase()) {
        case ' ':
          e.preventDefault()
          if (selectedRegion.value) playSelection()
          break
        case 's':
          stopPlayback()
          break
        case 'l':
          toggleLoop()
          break
        case 'e':
          if (e.ctrlKey && selectedRegion.value) {
            e.preventDefault()
            exportSelection()
          }
          break
        case 'n':
          if (e.ctrlKey) {
            e.preventDefault()
            resetAll()
          }
          break
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyboard)
      // Simulate counter animation
      const interval = setInterval(() => {
        sliceCounter.value += Math.floor(Math.random() * 3) + 1
      }, 3000)
      
      onUnmounted(() => {
        clearInterval(interval)
        window.removeEventListener('keydown', handleKeyboard)
      })
    })

    // Direct MP3 slicing function - improved version
    const directMp3Slice = async (file, startTime, endTime) => {
      return new Promise(async (resolve) => {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const view = new DataView(arrayBuffer)
          
          // MP3 frame structure
          const frames = []
          let pos = 0
          let currentTime = 0
          
          // Skip ID3v2 if present
          if (arrayBuffer.byteLength > 3 && 
              view.getUint8(0) === 0x49 && 
              view.getUint8(1) === 0x44 && 
              view.getUint8(2) === 0x33) { // "ID3"
            const tagSize = ((view.getUint8(6) & 0x7f) << 21) |
                          ((view.getUint8(7) & 0x7f) << 14) |
                          ((view.getUint8(8) & 0x7f) << 7) |
                          (view.getUint8(9) & 0x7f)
            pos = tagSize + 10
            console.log(`Skipping ID3v2 tag of size ${tagSize + 10} bytes`)
          }
          
          // Skip ID3v1 tag at the end
          let endPos = arrayBuffer.byteLength
          if (arrayBuffer.byteLength > 128) {
            const possibleTag = new Uint8Array(arrayBuffer, arrayBuffer.byteLength - 128, 3)
            if (possibleTag[0] === 0x54 && possibleTag[1] === 0x41 && possibleTag[2] === 0x47) { // "TAG"
              endPos -= 128
              console.log('Found ID3v1 tag at end, adjusting end position')
            }
          }
          
          // Improved MP3 frame detection
          const findNextFrame = (startPos) => {
            for (let i = startPos; i < endPos - 4; i++) {
              // Check for frame sync (11 bits set)
              if (view.getUint8(i) === 0xFF && (view.getUint8(i + 1) & 0xE0) === 0xE0) {
                return i
              }
            }
            return -1
          }
          
          // Parse ALL MP3 frames with better error handling
          while (pos < endPos - 4 && pos >= 0) {
            pos = findNextFrame(pos)
            if (pos === -1) break
            
            const header = view.getUint32(pos, false)
            
            // Extract header info
            const version = (header >> 19) & 3
            const layer = (header >> 17) & 3
            const bitrateIndex = (header >> 12) & 15
            const sampleRateIndex = (header >> 10) & 3
            const padding = (header >> 9) & 1
            
            // Skip invalid headers
            if (version === 1 || layer === 0 || bitrateIndex === 0 || bitrateIndex === 15 || sampleRateIndex === 3) {
              pos++
              continue
            }
            
            // Bitrate tables for different MPEG versions and layers
            let bitrates
            if (version === 3) { // MPEG 1
              if (layer === 3) { // Layer I
                bitrates = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 0]
              } else if (layer === 2) { // Layer II
                bitrates = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 0]
              } else if (layer === 1) { // Layer III
                bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0]
              }
            } else { // MPEG 2 or 2.5
              if (layer === 3) { // Layer I
                bitrates = [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 0]
              } else { // Layer II or III
                bitrates = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0]
              }
            }
            
            // Sample rate table
            const sampleRates = version === 3 ? [44100, 48000, 32000, 0] :
                              version === 2 ? [22050, 24000, 16000, 0] :
                              [11025, 12000, 8000, 0]
            
            const bitrate = bitrates[bitrateIndex] * 1000
            const sampleRate = sampleRates[sampleRateIndex]
            
            if (bitrate && sampleRate) {
              // Calculate frame size based on layer
              let frameSize
              let samplesPerFrame
              
              if (layer === 3) { // Layer I
                frameSize = Math.floor((12 * bitrate / sampleRate + padding) * 4)
                samplesPerFrame = 384
              } else if (layer === 2) { // Layer II
                frameSize = Math.floor(144 * bitrate / sampleRate + padding)
                samplesPerFrame = 1152
              } else { // Layer III
                if (version === 3) { // MPEG 1
                  frameSize = Math.floor(144 * bitrate / sampleRate + padding)
                  samplesPerFrame = 1152
                } else { // MPEG 2 or 2.5
                  frameSize = Math.floor(72 * bitrate / sampleRate + padding)
                  samplesPerFrame = 576
                }
              }
              
              const frameDuration = samplesPerFrame / sampleRate
              
              // Verify frame size doesn't exceed file bounds
              if (pos + frameSize <= endPos) {
                frames.push({
                  position: pos,
                  size: frameSize,
                  time: currentTime,
                  duration: frameDuration,
                  header: header
                })
                
                currentTime += frameDuration
                pos += frameSize
              } else {
                break
              }
            } else {
              pos++
            }
          }
          
          console.log(`Found ${frames.length} MP3 frames, total duration: ${currentTime.toFixed(2)}s`)
          
          if (frames.length === 0) {
            throw new Error('No valid MP3 frames found')
          }
          
          // Find frames within our time range with better boundary handling
          let startFrameIndex = 0
          let endFrameIndex = frames.length - 1
          
          // Find the first frame that starts at or after startTime
          for (let i = 0; i < frames.length; i++) {
            if (frames[i].time >= startTime) {
              startFrameIndex = i
              break
            }
          }
          
          // Find the last frame that ends at or before endTime
          for (let i = frames.length - 1; i >= 0; i--) {
            if (frames[i].time + frames[i].duration <= endTime) {
              endFrameIndex = i
              break
            }
          }
          
          // Ensure we have valid indices
          if (startFrameIndex > endFrameIndex) {
            startFrameIndex = Math.max(0, Math.floor(frames.length * (startTime / currentTime)))
            endFrameIndex = Math.min(frames.length - 1, Math.ceil(frames.length * (endTime / currentTime)))
          }
          
          console.log(`Slicing frames ${startFrameIndex} to ${endFrameIndex} (${endFrameIndex - startFrameIndex + 1} frames)`)
          console.log(`Time range: ${frames[startFrameIndex].time.toFixed(2)}s to ${(frames[endFrameIndex].time + frames[endFrameIndex].duration).toFixed(2)}s`)
          
          // Build new MP3 from exact frames
          const chunks = []
          let newFileSize = 0
          
          // Optionally copy ID3v2 tag if present (you might want to update it with new duration)
          if (arrayBuffer.byteLength > 3 && 
              view.getUint8(0) === 0x49 && 
              view.getUint8(1) === 0x44 && 
              view.getUint8(2) === 0x33) {
            const tagSize = ((view.getUint8(6) & 0x7f) << 21) |
                          ((view.getUint8(7) & 0x7f) << 14) |
                          ((view.getUint8(8) & 0x7f) << 7) |
                          (view.getUint8(9) & 0x7f) + 10
            chunks.push(new Uint8Array(arrayBuffer, 0, tagSize))
            newFileSize += tagSize
          }
          
          // Copy selected frames
          for (let i = startFrameIndex; i <= endFrameIndex && i < frames.length; i++) {
            const frame = frames[i]
            chunks.push(new Uint8Array(arrayBuffer, frame.position, frame.size))
            newFileSize += frame.size
          }
          
          // Create blob
          const blob = new Blob(chunks, { type: 'audio/mpeg' })
          console.log(`Created MP3 slice: ${blob.size} bytes (${newFileSize} bytes expected)`)
          
          // Verify we actually created something
          if (blob.size < 1000) {
            throw new Error('Slice too small, likely invalid')
          }
          
          resolve(blob)
          
        } catch (error) {
          console.error('MP3 direct slice error:', error)
          
          // Fallback to quality re-encode
          console.log('Falling back to re-encode method...')
          try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
            const audioBuffer = await audioCtx.decodeAudioData(await file.arrayBuffer())
            
            const startSample = Math.floor(startTime * audioBuffer.sampleRate)
            const endSample = Math.floor(endTime * audioBuffer.sampleRate)
            const length = endSample - startSample
            
            const newBuffer = audioCtx.createBuffer(
              audioBuffer.numberOfChannels,
              length,
              audioBuffer.sampleRate
            )
            
            for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
              const sourceData = audioBuffer.getChannelData(channel)
              const targetData = newBuffer.getChannelData(channel)
              for (let i = 0; i < length; i++) {
                targetData[i] = sourceData[startSample + i]
              }
            }
            
            const bitrate = audioFileInfo.value.bitrate || 320
            const blob = await convertToMp3(null, newBuffer, bitrate.toString())
            resolve(blob)
          } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError)
            resolve(null)
          }
        }
      })
    }

    // Direct binary slice function for WAV files
    const directBinarySlice = async (file, startTime, endTime) => {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const view = new DataView(arrayBuffer)
        
        // Verify WAV format
        if (view.getUint32(0, false) !== 0x52494646 || view.getUint32(8, false) !== 0x57415645) {
          throw new Error('Not a valid WAV file')
        }
        
        // Find fmt and data chunks
        let fmtChunk = null
        let dataChunkOffset = 0
        let dataChunkSize = 0
        let offset = 12 // Skip RIFF header
        
        while (offset < arrayBuffer.byteLength - 8) {
          const chunkId = view.getUint32(offset, false)
          const chunkSize = view.getUint32(offset + 4, true)
          
          if (chunkId === 0x666d7420) { // "fmt "
            fmtChunk = {
              audioFormat: view.getUint16(offset + 8, true),
              numChannels: view.getUint16(offset + 10, true),
              sampleRate: view.getUint32(offset + 12, true),
              byteRate: view.getUint32(offset + 16, true),
              blockAlign: view.getUint16(offset + 20, true),
              bitsPerSample: view.getUint16(offset + 22, true)
            }
          } else if (chunkId === 0x64617461) { // "data"
            dataChunkOffset = offset + 8
            dataChunkSize = chunkSize
            break
          }
          
          offset += 8 + chunkSize
          // Ensure even alignment
          if (chunkSize % 2 !== 0) offset++
        }
        
        if (!fmtChunk || !dataChunkOffset) {
          throw new Error('Could not find required WAV chunks')
        }
        
        console.log('WAV format info:', fmtChunk)
        
        // Calculate byte positions for the slice
        const bytesPerSample = fmtChunk.bitsPerSample / 8
        const bytesPerFrame = bytesPerSample * fmtChunk.numChannels
        const sampleRate = fmtChunk.sampleRate
        
        // Calculate frame-aligned positions
        const startFrame = Math.floor(startTime * sampleRate)
        const endFrame = Math.floor(endTime * sampleRate)
        const startByte = startFrame * bytesPerFrame
        const endByte = endFrame * bytesPerFrame
        const sliceSize = endByte - startByte
        
        console.log(`Slicing from frame ${startFrame} to ${endFrame} (${sliceSize} bytes)`)
        
        // Verify bounds
        if (startByte < 0 || endByte > dataChunkSize) {
          throw new Error('Slice bounds exceed audio data')
        }
        
        // Create new WAV file with exact same format
        const headerSize = 44
        const newArrayBuffer = new ArrayBuffer(headerSize + sliceSize)
        const newView = new DataView(newArrayBuffer)
        
        // Write WAV header
        let pos = 0
        
        // RIFF chunk
        newView.setUint32(pos, 0x52494646, false); pos += 4 // "RIFF"
        newView.setUint32(pos, 36 + sliceSize, true); pos += 4 // File size - 8
        newView.setUint32(pos, 0x57415645, false); pos += 4 // "WAVE"
        
        // fmt chunk - copy exact format from original
        newView.setUint32(pos, 0x666d7420, false); pos += 4 // "fmt "
        newView.setUint32(pos, 16, true); pos += 4 // fmt chunk size
        newView.setUint16(pos, fmtChunk.audioFormat, true); pos += 2 // Audio format
        newView.setUint16(pos, fmtChunk.numChannels, true); pos += 2 // Channels
        newView.setUint32(pos, fmtChunk.sampleRate, true); pos += 4 // Sample rate
        newView.setUint32(pos, fmtChunk.byteRate, true); pos += 4 // Byte rate
        newView.setUint16(pos, fmtChunk.blockAlign, true); pos += 2 // Block align
        newView.setUint16(pos, fmtChunk.bitsPerSample, true); pos += 2 // Bits per sample
        
        // data chunk
        newView.setUint32(pos, 0x64617461, false); pos += 4 // "data"
        newView.setUint32(pos, sliceSize, true); pos += 4 // Data size
        
        // Copy audio data - this is the key part for perfect quality preservation
        const sourceData = new Uint8Array(arrayBuffer, dataChunkOffset + startByte, sliceSize)
        const targetData = new Uint8Array(newArrayBuffer, headerSize)
        targetData.set(sourceData)
        
        // Create blob
        const blob = new Blob([newArrayBuffer], { type: 'audio/wav' })
        console.log(`Created WAV slice: ${blob.size} bytes (binary copy)`)
        
        return blob
        
      } catch (error) {
        console.error('Direct binary slice error:', error)
        return null
      }
    }

    const handleDrop = (e) => {
      e.preventDefault()
      isDragging.value = false
      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFile(files[0])
      }
    }

    const handleFileSelect = (e) => {
      const files = e.target.files
      if (files.length > 0) {
        handleFile(files[0])
      }
    }

    const handleFile = async (file) => {
      if (!file.type.includes('audio')) {
        alert('Please select an audio file')
        return
      }

      isLoading.value = true
      loadingMessage.value = 'Analyzing audio file...'
      audioFile.value = file

      // Analyze the file format
      audioFileInfo.value = await analyzeAudioFile(file)
      console.log('File analysis:', audioFileInfo.value)

      // Store the original file for binary operations
      originalFileBlob.value = file

      // Wait for DOM to update
      await nextTick()

      loadingMessage.value = 'Loading your sick beats...'

      // Initialize WaveSurfer
      await initWaveSurfer(file)
      
      // Detect BPM (mock for now)
      setTimeout(() => {
        bpm.value = Math.floor(Math.random() * 60) + 100 // Random BPM between 100-160
      }, 1000)
      
      isLoading.value = false
    }

    const initWaveSurfer = async (file) => {
      if (wavesurfer.value) {
        wavesurfer.value.destroy()
      }

      const url = URL.createObjectURL(file)

      // Wait for next tick to ensure DOM is updated
      await nextTick()

      // Check if container exists
      if (!waveformContainer.value) {
        console.error('Waveform container not found')
        isLoading.value = false
        return
      }

      wavesurfer.value = WaveSurfer.create({
        container: waveformContainer.value,
        waveColor: '#a855f7',
        progressColor: '#ec4899',
        cursorColor: '#fff',
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        responsive: true,
        height: 256,
        normalize: true,
        minPxPerSec: zoomLevel.value,
        backend: 'WebAudio',
        plugins: []
      })

      // Initialize regions plugin
      regionsPlugin.value = wavesurfer.value.registerPlugin(RegionsPlugin.create())

      // Set up event listeners
      wavesurfer.value.on('ready', () => {
        duration.value = wavesurfer.value.getDuration()
        // Store the decoded audio data
        audioBuffer.value = wavesurfer.value.getDecodedData()
        if (audioBuffer.value) {
          originalSampleRate.value = audioBuffer.value.sampleRate
        }
        
        // Setup spectrum analyzer after audio is ready
        setupSpectrumAnalyzer()
      })

      wavesurfer.value.on('audioprocess', (time) => {
        currentTime.value = time
        // Stop playback if we're in selection mode and reached the end
        if (selectedRegion.value && isPlaying.value && time >= selectedRegion.value.end) {
          if (loopEnabled.value) {
            // Loop back to start
            wavesurfer.value.seekTo(selectedRegion.value.start / duration.value)
          } else {
            stopPlayback()
          }
        }
      })

      wavesurfer.value.on('play', () => {
        isPlaying.value = true
        if (showSpectrum.value && analyser.value) {
          startSpectrumAnimation()
        }
      })

      wavesurfer.value.on('pause', () => {
        isPlaying.value = false
        if (animationFrame.value) cancelAnimationFrame(animationFrame.value)
      })

      wavesurfer.value.on('seeking', () => {
        // Ensure we don't seek outside the region when playing selection
        if (selectedRegion.value && isPlaying.value) {
          const time = wavesurfer.value.getCurrentTime()
          if (time < selectedRegion.value.start || time > selectedRegion.value.end) {
            wavesurfer.value.seekTo(selectedRegion.value.start / duration.value)
          }
        }
      })

      // Add hover time display
      waveformContainer.value.addEventListener('mousemove', (e) => {
        const rect = waveformContainer.value.getBoundingClientRect()
        const x = e.clientX - rect.left
        hoverPosition.value = x
        hoverTime.value = (x / rect.width) * duration.value
      })

      waveformContainer.value.addEventListener('mouseleave', () => {
        hoverTime.value = null
        hoverPosition.value = null
      })

      // Region event handlers
      regionsPlugin.value.on('region-created', (region) => {
        // Remove previous region if exists
        if (selectedRegion.value) {
          selectedRegion.value.remove()
        }
        selectedRegion.value = region
        
        // Style the region
        region.setOptions({
          color: 'rgba(168, 85, 247, 0.3)',
          drag: true,
          resize: true
        })
      })

      regionsPlugin.value.on('region-updated', (region) => {
        selectedRegion.value = region
      })

      regionsPlugin.value.on('region-removed', () => {
        selectedRegion.value = null
        stopPlayback()
      })

      // Enable region creation
      regionsPlugin.value.enableDragSelection({
        color: 'rgba(236, 72, 153, 0.3)'
      })

      // Load the audio
      await wavesurfer.value.load(url)
    }

    const setupSpectrumAnalyzer = () => {
      // Initialize for visual effect
      showSpectrum.value = true
    }

    const startSpectrumAnimation = () => {
      if (!spectrumCanvas.value) return
      
      const canvas = spectrumCanvas.value
      const ctx = canvas.getContext('2d')
      const bars = 32
      
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      const draw = () => {
        if (!isPlaying.value) {
          cancelAnimationFrame(animationFrame.value)
          return
        }
        
        animationFrame.value = requestAnimationFrame(draw)
        
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        const barWidth = canvas.width / bars - 2
        const time = Date.now() / 100
        
        for(let i = 0; i < bars; i++) {
          // Create dynamic heights based on time and position
          const variance = Math.sin(time + i * 0.5) * 0.3 + 0.7
          const barHeight = Math.random() * canvas.height * 0.6 * variance + canvas.height * 0.2
          
          const x = i * (barWidth + 2)
          
          // Create gradient
          const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)')
          gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.8)')
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0.8)')
          
          ctx.fillStyle = gradient
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
          
          // Add top cap
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.fillRect(x, canvas.height - barHeight - 2, barWidth, 2)
        }
      }
      
      draw()
    }

    const playSelection = () => {
      if (selectedRegion.value && wavesurfer.value) {
        if (isPlaying.value) {
          wavesurfer.value.pause()
          clearInterval(playbackInterval.value)
        } else {
          // Set playback to start of region
          wavesurfer.value.seekTo(selectedRegion.value.start / duration.value)
          
          // Play from the region start
          wavesurfer.value.play()
          
          // Update progress bar
          playbackInterval.value = setInterval(() => {
            if (isPlaying.value && selectedRegion.value) {
              const current = wavesurfer.value.getCurrentTime()
              const progress = ((current - selectedRegion.value.start) / (selectedRegion.value.end - selectedRegion.value.start)) * 100
              playbackProgress.value = Math.min(100, Math.max(0, progress))
              
              // Stop or loop when reaching the end
              if (current >= selectedRegion.value.end) {
                if (loopEnabled.value) {
                  // Loop back to start
                  wavesurfer.value.seekTo(selectedRegion.value.start / duration.value)
                  playbackProgress.value = 0
                } else {
                  stopPlayback()
                }
              }
            }
          }, 50)
        }
      }
    }

    const stopPlayback = () => {
      if (wavesurfer.value) {
        wavesurfer.value.pause()
        if (selectedRegion.value) {
          wavesurfer.value.seekTo(selectedRegion.value.start / duration.value)
        }
        isPlaying.value = false
        playbackProgress.value = 0
        clearInterval(playbackInterval.value)
      }
    }

    const toggleLoop = () => {
      loopEnabled.value = !loopEnabled.value
    }

    const toggleShortcuts = () => {
      showShortcuts.value = !showShortcuts.value
    }

    const updateZoom = () => {
      if (wavesurfer.value) {
        wavesurfer.value.zoom(Number(zoomLevel.value))
      }
    }

    const removeFile = () => {
      if (wavesurfer.value) {
        wavesurfer.value.destroy()
      }
      audioFile.value = null
      selectedRegion.value = null
      isPlaying.value = false
      currentTime.value = 0
      duration.value = 0
      audioBuffer.value = null
      bpm.value = 0
      clearInterval(playbackInterval.value)
      if (animationFrame.value) cancelAnimationFrame(animationFrame.value)
    }

    const resetAll = () => {
      removeFile()
    }

    const exportSelection = async () => {
      if (!selectedRegion.value || !audioBuffer.value) {
        alert('Please select a region to export')
        return
      }

      isExporting.value = true
      isLoading.value = true
      loadingMessage.value = 'Exporting with original quality...'

      console.log('Export settings:', {
        preserveOriginal: preserveOriginal.value,
        codec: audioFileInfo.value.codec,
        originalFormat: audioFormat.value,
        region: { start: selectedRegion.value.start, end: selectedRegion.value.end }
      })

      try {
        const region = selectedRegion.value
        
        // Check if we should do a direct binary slice
        if (preserveOriginal.value) {
          const originalFile = originalFileBlob.value || audioFile.value
          
          // Handle different formats with ZERO conversion
          if (audioFileInfo.value.codec === 'mp3') {
            // Direct MP3 slice
            loadingMessage.value = 'Performing direct MP3 slice...'
            const blob = await directMp3Slice(originalFile, region.start, region.end)
            
            if (blob) {
              saveAs(blob, `${outputFileName.value}.mp3`)
              sliceCounter.value += 1
              isExporting.value = false
              isLoading.value = false
              return
            }
          } else if (audioFileInfo.value.codec && audioFileInfo.value.codec.includes('wav')) {
            // Direct binary WAV slice
            loadingMessage.value = 'Performing direct binary slice...'
            const blob = await directBinarySlice(originalFile, region.start, region.end)
            
            if (blob) {
              saveAs(blob, `${outputFileName.value}.wav`)
              sliceCounter.value += 1
              isExporting.value = false
              isLoading.value = false
              return
            }
          } else {
            alert(`Direct slice not yet supported for ${audioFileInfo.value.codec || 'this'} format. Using standard export.`)
          }
        }
        
        // Original processing code continues here...
        const startSample = Math.floor(region.start * audioBuffer.value.sampleRate)
        const endSample = Math.floor(region.end * audioBuffer.value.sampleRate)
        const length = endSample - startSample

        // Use original sample rate by default to preserve quality
        const targetSampleRate = sampleRate.value === 'original' 
          ? audioBuffer.value.sampleRate 
          : parseInt(sampleRate.value)

        // Only resample if explicitly requested
        let processedBuffer = audioBuffer.value
        
        if (targetSampleRate !== audioBuffer.value.sampleRate) {
          // Create offline context for resampling
          const offlineCtx = new OfflineAudioContext(
            audioBuffer.value.numberOfChannels,
            Math.floor(length * targetSampleRate / audioBuffer.value.sampleRate),
            targetSampleRate
          )

          const source = offlineCtx.createBufferSource()
          source.buffer = audioBuffer.value
          source.connect(offlineCtx.destination)
          source.start(0, region.start, region.end - region.start)
          
          processedBuffer = await offlineCtx.startRendering()
        } else {
          // Extract the region without resampling to preserve exact quality
          if (!audioContext.value) {
            audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
          }
          
          const regionBuffer = audioContext.value.createBuffer(
            audioBuffer.value.numberOfChannels,
            length,
            audioBuffer.value.sampleRate
          )
          
          // Copy exact samples from the region
          for (let channel = 0; channel < audioBuffer.value.numberOfChannels; channel++) {
            const sourceData = audioBuffer.value.getChannelData(channel)
            const targetData = regionBuffer.getChannelData(channel)
            
            // Direct sample copy - no processing, no quality loss
            for (let i = 0; i < length; i++) {
              targetData[i] = sourceData[startSample + i]
            }
          }
          
          processedBuffer = regionBuffer
        }

        // Apply fades only if requested
        if (parseFloat(fadeIn.value) > 0 || parseFloat(fadeOut.value) > 0) {
          processedBuffer = await applyFades(processedBuffer)
        }

        let blob
        let filename = outputFileName.value

        // Determine the best export format based on input
        const inputFormat = audioFileInfo.value.codec || audioFormat.value.toLowerCase()
        let actualExportFormat = exportFormat.value

        // Auto-match quality settings if not explicitly changed
        if (exportFormat.value === 'original' || 
            (exportFormat.value === 'mp3' && inputFormat === 'mp3') ||
            (exportFormat.value === 'wav' && inputFormat.includes('wav'))) {
          
          switch (inputFormat) {
            case 'mp3':
              actualExportFormat = 'mp3'
              // Use original bitrate if available
              if (audioFileInfo.value.bitrate && mp3Bitrate.value === '320') {
                mp3Bitrate.value = audioFileInfo.value.bitrate.toString()
              }
              break
            case 'wav':
            case 'wav-pcm':
            case 'wav-float':
              actualExportFormat = 'wav'
              break
            case 'flac':
              actualExportFormat = 'wav' // High quality WAV
              break
            default:
              actualExportFormat = 'wav'
          }
        }

        switch (actualExportFormat) {
          case 'wav':
            // Match original bit depth if detected
            let wavBitDepth = 32
            let useFloatFormat = true
            
            if (bitDepth.value === 'original' && audioFileInfo.value.bitDepth) {
              wavBitDepth = audioFileInfo.value.bitDepth
              useFloatFormat = audioFileInfo.value.codec === 'wav-float' || wavBitDepth === 32
            } else if (bitDepth.value !== 'original') {
              wavBitDepth = parseInt(bitDepth.value)
              useFloatFormat = wavBitDepth >= 32
            }
            
            blob = await audioBufferToWav(processedBuffer, wavBitDepth, useFloatFormat)
            filename += '.wav'
            break
            
          case 'mp3':
            // Use original MP3 bitrate if detected
            const targetBitrate = audioFileInfo.value.codec === 'mp3' && audioFileInfo.value.bitrate
              ? audioFileInfo.value.bitrate.toString()
              : mp3Bitrate.value
              
            loadingMessage.value = `Encoding to MP3 at ${targetBitrate}kbps...`
            blob = await convertToMp3(null, processedBuffer, targetBitrate)
            
            if (blob) {
              filename += '.mp3'
            } else {
              // Fallback to highest quality WAV
              blob = await audioBufferToWav(processedBuffer, audioFileInfo.value.bitDepth || 32, true)
              filename += '.wav'
              showMp3Notification()
            }
            break
            
          case 'flac':
            // Export as highest quality WAV
            blob = await audioBufferToWav(processedBuffer, 32, true)
            filename += '.wav'
            showFlacNotification()
            break
        }

        saveAs(blob, filename)
        sliceCounter.value += 1
        
      } catch (error) {
        console.error('Export error:', error)
        alert('Error exporting audio. Please try again.')
      } finally {
        isExporting.value = false
        isLoading.value = false
      }
    }

    // Apply fades to buffer
    const applyFades = async (buffer) => {
      const fadeInTime = parseFloat(fadeIn.value)
      const fadeOutTime = parseFloat(fadeOut.value)
      
      if (fadeInTime === 0 && fadeOutTime === 0) return buffer
      
      const fadedBuffer = audioContext.value.createBuffer(
        buffer.numberOfChannels,
        buffer.length,
        buffer.sampleRate
      )
      
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const sourceData = buffer.getChannelData(channel)
        const targetData = fadedBuffer.getChannelData(channel)
        
        const fadeInSamples = fadeInTime * buffer.sampleRate
        const fadeOutSamples = fadeOutTime * buffer.sampleRate
        const startFadeOut = buffer.length - fadeOutSamples
        
        for (let i = 0; i < buffer.length; i++) {
          let gain = 1
          
          // Apply fade in
          if (i < fadeInSamples && fadeInSamples > 0) {
            gain = i / fadeInSamples
          }
          
          // Apply fade out
          if (i >= startFadeOut && fadeOutSamples > 0) {
            gain = (buffer.length - i) / fadeOutSamples
          }
          
          targetData[i] = sourceData[i] * gain
        }
      }
      
      return fadedBuffer
    }

    // Updated MP3 conversion with quality parameter
    const convertToMp3 = async (wavBlob, audioBuffer, bitrate = null) => {
      try {
        if (!window.lamejs) {
          await loadLamejs()
        }
        
        const channels = audioBuffer.numberOfChannels
        const sampleRate = audioBuffer.sampleRate
        const kbps = parseInt(bitrate || mp3Bitrate.value)
        
        const mp3encoder = new window.lamejs.Mp3Encoder(channels, sampleRate, kbps)
        
        const samples = []
        for (let i = 0; i < channels; i++) {
          samples.push(audioBuffer.getChannelData(i))
        }
        
        const sampleBlockSize = 1152
        const mp3Data = []
        
        for (let i = 0; i < audioBuffer.length; i += sampleBlockSize) {
          const leftChunk = new Int16Array(sampleBlockSize)
          const rightChunk = new Int16Array(sampleBlockSize)
          
          for (let j = 0; j < sampleBlockSize; j++) {
            const idx = i + j
            if (idx < audioBuffer.length) {
              // Better conversion to prevent clipping
              const left = Math.max(-1, Math.min(1, samples[0][idx])) * 32767
              leftChunk[j] = Math.round(left)
              
              if (channels > 1) {
                const right = Math.max(-1, Math.min(1, samples[1][idx])) * 32767
                rightChunk[j] = Math.round(right)
              }
            }
          }
          
          const mp3buf = channels === 1 
            ? mp3encoder.encodeBuffer(leftChunk)
            : mp3encoder.encodeBuffer(leftChunk, rightChunk)
            
          if (mp3buf.length > 0) {
            mp3Data.push(mp3buf)
          }
        }
        
        const mp3buf = mp3encoder.flush()
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf)
        }
        
        return new Blob(mp3Data, { type: 'audio/mp3' })
        
      } catch (error) {
        console.error('MP3 conversion error:', error)
        return null
      }
    }
    
    // Load lamejs library dynamically
    const loadLamejs = () => {
      return new Promise((resolve, reject) => {
        if (window.lamejs) {
          resolve()
          return
        }
        
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.all.js'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const analyzeAudioFile = async (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        
        reader.onload = (e) => {
          const buffer = e.target.result
          const view = new DataView(buffer)
          
          // Detect file format and properties
          const fileInfo = {
            codec: '',
            bitrate: 0,
            bitDepth: 16,
            channels: 2,
            originalFormat: file.type,
            fileSize: file.size
          }
          
          // Check for WAV format
          if (view.getUint32(0, false) === 0x52494646) { // "RIFF"
            fileInfo.codec = 'wav'
            
            // Find fmt chunk
            let offset = 12
            while (offset < buffer.byteLength - 8) {
              const chunkId = view.getUint32(offset, false)
              const chunkSize = view.getUint32(offset + 4, true)
              
              if (chunkId === 0x666d7420) { // "fmt "
                const audioFormat = view.getUint16(offset + 8, true)
                fileInfo.channels = view.getUint16(offset + 10, true)
                const sampleRate = view.getUint32(offset + 12, true)
                const byteRate = view.getUint32(offset + 16, true)
                const blockAlign = view.getUint16(offset + 20, true)
                fileInfo.bitDepth = view.getUint16(offset + 22, true)
                
                // Calculate bitrate
                fileInfo.bitrate = Math.round(byteRate * 8 / 1000) // Convert to kbps
                
                // Determine format type
                if (audioFormat === 1) {
                  fileInfo.codec = 'wav-pcm'
                } else if (audioFormat === 3) {
                  fileInfo.codec = 'wav-float'
                }
                break
              }
              offset += 8 + chunkSize
            }
          }
          // Check for MP3 format
          else if ((view.getUint16(0, false) & 0xFFE0) === 0xFFE0 || 
                   (view.getUint32(0, false) === 0x49443303)) { // ID3 tag
            fileInfo.codec = 'mp3'
            
            // Try to find MP3 frame header
            let mp3Offset = 0
            if ((view.getUint32(0, false) === 0x49443303)) {
              // Skip ID3v2 tag
              const tagSize = ((view.getUint8(6) & 0x7f) << 21) |
                            ((view.getUint8(7) & 0x7f) << 14) |
                            ((view.getUint8(8) & 0x7f) << 7) |
                            (view.getUint8(9) & 0x7f)
              mp3Offset = tagSize + 10
            }
            
            // Find first MP3 frame
            for (let i = mp3Offset; i < Math.min(buffer.byteLength - 4, mp3Offset + 10000); i++) {
              const header = view.getUint32(i, false)
              if ((header & 0xFFE00000) === 0xFFE00000) { // Frame sync
                // Valid MP3 header found
                const version = (header >> 19) & 3
                const layer = (header >> 17) & 3
                const bitrateIndex = (header >> 12) & 15
                const samplingIndex = (header >> 10) & 3
                const channelMode = (header >> 6) & 3
                
                // Bitrate table for MPEG1 Layer 3 (most common)
                const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0]
                
                // MPEG2 Layer 3 bitrates
                const bitrates2 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0]
                
                if (version === 3 && layer === 1) { // MPEG1 Layer 3
                  fileInfo.bitrate = bitrates[bitrateIndex]
                } else if (version === 2 && layer === 1) { // MPEG2 Layer 3
                  fileInfo.bitrate = bitrates2[bitrateIndex]
                }
                
                // If bitrate is still 0, estimate from file size
                if (fileInfo.bitrate === 0 && file.size > 0) {
                  // Rough estimate: file size in bits / duration in seconds
                  // Assume ~3 minutes for estimation
                  fileInfo.bitrate = Math.round((file.size * 8) / (180 * 1000))
                  if (fileInfo.bitrate > 320) fileInfo.bitrate = 320
                  if (fileInfo.bitrate < 128) fileInfo.bitrate = 128
                }
                
                fileInfo.channels = channelMode === 3 ? 1 : 2
                fileInfo.bitDepth = 16 // MP3 is always 16-bit equivalent
                console.log('MP3 detected:', fileInfo)
                break
              }
            }
          }
          // Check for FLAC format
          else if (view.getUint32(0, false) === 0x664C6143) { // "fLaC"
            fileInfo.codec = 'flac'
            
            // FLAC uses variable bitrate, estimate from file size and duration
            fileInfo.bitDepth = 24 // Common for FLAC
            fileInfo.channels = 2 // Will be updated when audio loads
          }
          
          resolve(fileInfo)
        }
        
        // Read first 64KB of file for analysis
        reader.readAsArrayBuffer(file.slice(0, 65536))
      })
    }
    
    const showMp3Notification = () => {
      alert(`Failed to encode MP3. Exported as WAV instead. This might happen if the encoder couldn't load.`)
    }

    const showFlacNotification = () => {
      alert(`FLAC export is not supported in browser. Exported as high-quality WAV instead.`)
    }

    // Convert AudioBuffer to WAV blob with configurable bit depth
    const audioBufferToWav = async (buffer, bitDepthValue = 16, useFloat = false) => {
      const numberOfChannels = buffer.numberOfChannels
      const sampleRate = buffer.sampleRate
      
      // Handle extreme bit depths
      let actualBitDepth = bitDepthValue
      let format = 1 // PCM by default
      
      if (bitDepthValue === 64) {
        // 64-bit float not standard in WAV, use 32-bit float
        actualBitDepth = 32
        format = 3
        useFloat = true
      } else if (bitDepthValue === 32 && useFloat) {
        format = 3 // IEEE float
      } else if (bitDepthValue === 8) {
        format = 1 // 8-bit PCM
      }
      
      const bitDepth = actualBitDepth
      const bytesPerSample = bitDepth / 8
      
      const length = buffer.length * numberOfChannels * bytesPerSample + 44
      const arrayBuffer = new ArrayBuffer(length)
      const view = new DataView(arrayBuffer)
      
      const channels = []
      for (let i = 0; i < numberOfChannels; i++) {
        channels.push(buffer.getChannelData(i))
      }
      
      let offset = 0
      
      // RIFF identifier
      const setString = (str) => {
        for (let i = 0; i < str.length; i++) {
          view.setUint8(offset + i, str.charCodeAt(i))
        }
        offset += str.length
      }
      
      const setUint16 = (data) => {
        view.setUint16(offset, data, true)
        offset += 2
      }
      
      const setUint32 = (data) => {
        view.setUint32(offset, data, true)
        offset += 4
      }
      
      // Write WAV header
      setString('RIFF')
      setUint32(length - 8)
      setString('WAVE')
      setString('fmt ')
      setUint32(16) // format chunk length
      setUint16(format) // format (1 = PCM, 3 = IEEE float)
      setUint16(numberOfChannels)
      setUint32(sampleRate)
      setUint32(sampleRate * numberOfChannels * bytesPerSample) // byte rate
      setUint16(numberOfChannels * bytesPerSample) // block align
      setUint16(bitDepth)
      setString('data')
      setUint32(length - offset - 4)
      
      // Write interleaved audio data
      let index = 0
      
      while (offset < length) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          // Get the sample value - already in float format from Web Audio
          let sample = channels[channel][index]
          
          if (bitDepth === 32 && useFloat) {
            // 32-bit float - write directly without conversion
            view.setFloat32(offset, sample, true)
            offset += 4
          } else if (bitDepth === 24) {
            // 24-bit PCM
            sample = Math.max(-1, Math.min(1, sample))
            sample = Math.round(sample * 8388607) // 2^23 - 1
            view.setUint8(offset, sample & 0xFF)
            view.setUint8(offset + 1, (sample >> 8) & 0xFF)
            view.setUint8(offset + 2, (sample >> 16) & 0xFF)
            offset += 3
          } else if (bitDepth === 16) {
            // 16-bit PCM
            sample = Math.max(-1, Math.min(1, sample))
            sample = Math.round(sample * 32767)
            view.setInt16(offset, sample, true)
            offset += 2
          } else if (bitDepth === 8) {
            // 8-bit PCM (unsigned)
            sample = Math.max(-1, Math.min(1, sample))
            sample = Math.round((sample + 1) * 127.5) // Convert to 0-255 range
            view.setUint8(offset, sample)
            offset += 1
          }
        }
        index++
      }
      
      return new Blob([arrayBuffer], { type: 'audio/wav' })
    }

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      const ms = Math.floor((seconds % 1) * 100)
      return `${minutes}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    onUnmounted(() => {
      if (wavesurfer.value) {
        wavesurfer.value.destroy()
      }
      if (playbackInterval.value) {
        clearInterval(playbackInterval.value)
      }
      if (animationFrame.value) {
        cancelAnimationFrame(animationFrame.value)
      }
      window.removeEventListener('keydown', handleKeyboard)
    })

    return {
      waveformContainer,
      spectrumCanvas,
      fileInput,
      audioFile,
      originalFileBlob,
      audioFileInfo,
      audioFormat,
      selectedRegion,
      isPlaying,
      currentTime,
      duration,
      zoomLevel,
      zoomPresets,
      isLoading,
      loadingMessage,
      exportFormat,
      mp3Bitrate,
      sampleRate,
      bitDepth,
      isExporting,
      originalSampleRate,
      outputFileName,
      audioBuffer,
      isDragging,
      playbackProgress,
      loopEnabled,
      showShortcuts,
      viewMode,
      showSpectrum,
      hoverTime,
      hoverPosition,
      bpm,
      sliceCounter,
      fadeIn,
      fadeOut,
      preserveOriginal,
      handleDrop,
      handleFileSelect,
      playSelection,
      stopPlayback,
      toggleLoop,
      toggleShortcuts,
      updateZoom,
      removeFile,
      resetAll,
      exportSelection,
      formatTime,
      formatFileSize
    }
  }
}
</script>

<style scoped>
/* Grid pattern background */
.grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Custom animations */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

@keyframes spin-reverse {
  to { transform: rotate(-360deg); }
}

.animate-spin-reverse {
  animation: spin-reverse 3s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}

.animate-scan {
  animation: scan 4s linear infinite;
}

@keyframes eq-bar {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}

.animate-eq-bar {
  animation: eq-bar 0.8s ease-in-out infinite;
  transform-origin: bottom;
}

/* Custom slider styles */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #a855f7, #ec4899);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
  transition: all 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #a855f7, #ec4899);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
  transition: all 0.2s;
  border: none;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
}
</style>