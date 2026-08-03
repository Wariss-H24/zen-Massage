const path = require('path')
const fs = require('fs/promises')

async function main() {
  const repoRoot = path.join(__dirname, '..')
  const srcDir = path.join(repoRoot, 'src', 'generated', 'prisma')
  const distDir = path.join(repoRoot, 'dist', 'generated', 'prisma')

  await fs.rm(distDir, { recursive: true, force: true })
  await fs.mkdir(path.dirname(distDir), { recursive: true })
  await fs.cp(srcDir, distDir, { recursive: true })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
