# 🎵 Kaiser Splicer

A powerful, browser-based audio slicing tool that preserves original quality with direct binary slicing capabilities. Slice your audio files with frame-perfect precision while maintaining the exact same quality as the source.


## ✨ Features

- 🎯 **Preserve Original Quality** - Direct binary slicing for WAV and MP3 files (no re-encoding!)
- 🎨 **Beautiful UI** - Modern, animated interface with DJ-inspired visuals
- 📊 **Visual Waveform Editor** - See exactly what you're cutting with zoom controls
- 🎧 **Real-time Preview** - Listen to your selection before exporting
- 🔄 **Loop Playback** - Perfect for finding the right cut points
- ⚡ **Multiple Format Support** - MP3, WAV, FLAC, M4A
- 🎛️ **Advanced Export Options** - Sample rate, bit depth, fade in/out controls
- ⌨️ **Keyboard Shortcuts** - Speed up your workflow
- 🌊 **Spectrum Analyzer** - Visual feedback while playing

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jackel27/Kaiser-Splicer.git
cd Kaiser-Splicer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser to `http://localhost:3000` (should open automatically)

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🎮 Usage

1. **Upload Audio**: Drag & drop or click to browse for your audio file
2. **Select Region**: Click and drag on the waveform to select the portion you want
3. **Preview**: Hit space or click play to preview your selection
4. **Export**: Choose your settings and export!

### Keyboard Shortcuts

- `Space` - Play/Pause selection
- `S` - Stop playback
- `L` - Toggle loop mode
- `Ctrl+E` - Export selection
- `Ctrl+N` - New file (clear current)

## 🔧 Technical Details

### Binary Slicing (Preserve Original Quality)

When "Preserve Original Quality" is enabled:
- **WAV files**: Direct byte-level copying with no decoding/encoding
- **MP3 files**: Frame-accurate slicing at MP3 frame boundaries
- **Result**: 100% identical quality to the source (bit-perfect for WAV)

### Export Options

#### When NOT preserving original quality:
- **Formats**: WAV, MP3, FLAC (exports as WAV due to browser limitations)
- **Sample Rates**: 44.1kHz to 768kHz
- **Bit Depths**: 8-bit to 64-bit float
- **MP3 Bitrates**: 96-320 kbps
- **Fades**: 0-1 second fade in/out

## 🏗️ Project Structure

```
Kaiser-Splicer/
├── src/
│   ├── App.vue          # Main application component
│   ├── main.js          # Application entry point
│   └── style.css        # Global styles (Tailwind)
├── public/              # Static assets
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies
```

## 🛠️ Built With

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [WaveSurfer.js](https://wavesurfer-js.org/) - Audio waveform visualization
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - HTML5 saveAs() implementation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by professional audio editing software
- DJ culture and music production workflows
- The open-source community for amazing libraries

## 🐛 Known Issues

- FLAC export currently exports as WAV due to browser limitations
- MP3 frame-boundary slicing may have slight timing variations (±1 frame)
- Very large files (>500MB) may cause performance issues

## 📮 Contact

Created by [Your Name] - feel free to contact me!

---

**Happy Slicing!** 🎵✂️
