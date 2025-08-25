import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data in proper order (respecting foreign key constraints)
  console.log('🧹 Cleaning existing data...')
  await prisma.reaction.deleteMany()
  await prisma.projectArtifact.deleteMany()
  await prisma.artifactTag.deleteMany()
  await prisma.artifact.deleteMany()
  await prisma.project.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  console.log('👥 Creating users...')
  const adminUser = await prisma.user.create({
    data: {
      name: 'AWK',
      email: 'fake@fake.com',
      role: 'Admin',
    },
  })

  const guestUser = await prisma.user.create({
    data: {
      name: 'Guest User',
      email: 'guest@example.com',
      role: 'User',
    },
  })

  // Create Tags
  console.log('🏷️ Creating tags...')
  const nextjsTag = await prisma.tag.create({
    data: { name: 'Next.js' },
  })

  const gameDesignTag = await prisma.tag.create({
    data: { name: 'Game Design' },
  })

  const prismaTag = await prisma.tag.create({
    data: { name: 'Prisma' },
  })

  const typescriptTag = await prisma.tag.create({
    data: { name: 'TypeScript' },
  })

  const webDevTag = await prisma.tag.create({
    data: { name: 'Web Development' },
  })

  // Create Projects
  console.log('📂 Creating projects...')
  const notebookProject = await prisma.project.create({
    data: {
      name: 'Generalist\'s Notebook',
      description: 'A personal website to showcase and organize creative projects and technical artifacts.',
      status: 'InProgress',
      ideation_date: new Date('2024-12-01'),
      llm_summary: 'A Next.js-based personal portfolio site with project tracking, artifact management, and AI-powered features for content discovery and sentiment analysis.',
      llm_sentiment_phrase: 'Excited and productive momentum',
    },
  })

  const islandProject = await prisma.project.create({
    data: {
      name: 'Codename Island',
      description: 'An experimental island survival game prototype exploring procedural generation and emergent gameplay.',
      status: 'Ideation',
      ideation_date: new Date('2024-11-15'),
      llm_summary: 'Early-stage game concept focusing on survival mechanics, procedural world generation, and player-driven narrative emergence.',
      llm_sentiment_phrase: 'Curious exploration phase',
    },
  })

  const automationProject = await prisma.project.create({
    data: {
      name: 'Development Automation Suite',
      description: 'Collection of scripts and tools to streamline development workflow and project management.',
      status: 'Shipped',
      ideation_date: new Date('2024-10-01'),
      llm_summary: 'Completed toolkit featuring GitHub automation, testing frameworks, and deployment scripts that significantly improved development velocity.',
      llm_sentiment_phrase: 'Satisfied and accomplished',
    },
  })

  // Create Artifacts
  console.log('📄 Creating artifacts...')
  const devLog1 = await prisma.artifact.create({
    data: {
      title: 'Dev Log #1: Setting up the Foundation',
      publish_date: new Date('2024-12-10'),
      content_path: '/content/devlog-001-foundation.mdx',
      type: 'DevLog',
    },
  })

  const devLog2 = await prisma.artifact.create({
    data: {
      title: 'Dev Log #2: Database Schema Design',
      publish_date: new Date('2024-12-15'),
      content_path: '/content/devlog-002-database.mdx',
      type: 'DevLog',
    },
  })

  const blogPost1 = await prisma.artifact.create({
    data: {
      title: 'Lessons from Building My First Personal Site',
      publish_date: new Date('2024-12-01'),
      content_path: '/content/blog-personal-site-lessons.mdx',
      type: 'BlogPost',
    },
  })

  const islandArtifact = await prisma.artifact.create({
    data: {
      title: 'Game Design Doc: Island Survival Mechanics',
      publish_date: new Date('2024-11-20'),
      content_path: '/content/island-game-design.mdx',
      type: 'DevLog',
    },
  })

  const automationArtifact = await prisma.artifact.create({
    data: {
      title: 'Automation Scripts Collection',
      publish_date: new Date('2024-10-15'),
      content_path: '/content/automation-scripts.mdx',
      type: 'Link',
    },
  })

  // Create Project-Artifact relationships
  console.log('🔗 Creating project-artifact relationships...')
  await prisma.projectArtifact.createMany({
    data: [
      { project_id: notebookProject.id, artifact_id: devLog1.id },
      { project_id: notebookProject.id, artifact_id: devLog2.id },
      { project_id: notebookProject.id, artifact_id: blogPost1.id },
      { project_id: islandProject.id, artifact_id: islandArtifact.id },
      { project_id: automationProject.id, artifact_id: automationArtifact.id },
    ],
  })

  // Create Artifact-Tag relationships
  console.log('🏷️ Creating artifact-tag relationships...')
  await prisma.artifactTag.createMany({
    data: [
      // Dev Log #1 tags
      { artifact_id: devLog1.id, tag_id: nextjsTag.id },
      { artifact_id: devLog1.id, tag_id: typescriptTag.id },
      { artifact_id: devLog1.id, tag_id: webDevTag.id },
      
      // Dev Log #2 tags  
      { artifact_id: devLog2.id, tag_id: prismaTag.id },
      { artifact_id: devLog2.id, tag_id: typescriptTag.id },
      { artifact_id: devLog2.id, tag_id: webDevTag.id },
      
      // Blog Post tags
      { artifact_id: blogPost1.id, tag_id: webDevTag.id },
      { artifact_id: blogPost1.id, tag_id: nextjsTag.id },
      
      // Island artifact tags
      { artifact_id: islandArtifact.id, tag_id: gameDesignTag.id },
      
      // Automation artifact tags
      { artifact_id: automationArtifact.id, tag_id: typescriptTag.id },
      { artifact_id: automationArtifact.id, tag_id: webDevTag.id },
    ],
  })

  // Create sample Reactions
  console.log('👍 Creating sample reactions...')
  await prisma.reaction.createMany({
    data: [
      // Reactions on projects
      {
        emoji: '🚀',
        review_text: 'Love the direction this project is taking!',
        user_id: guestUser.id,
        project_id: notebookProject.id,
      },
      {
        emoji: '💡',
        review_text: 'Interesting game concept, excited to see how it develops.',
        user_id: guestUser.id,
        project_id: islandProject.id,
      },
      {
        emoji: '✅',
        review_text: 'These automation tools saved me hours of work.',
        user_id: adminUser.id,
        project_id: automationProject.id,
      },
      
      // Reactions on artifacts
      {
        emoji: '📚',
        review_text: 'Great technical deep-dive, very helpful setup guide.',
        user_id: guestUser.id,
        artifact_id: devLog1.id,
      },
      {
        emoji: '🧠',
        review_text: 'Solid database design patterns here.',
        user_id: guestUser.id,
        artifact_id: devLog2.id,
      },
      {
        emoji: '🎯',
        review_text: 'Relatable insights about building personal projects.',
        user_id: adminUser.id,
        artifact_id: blogPost1.id,
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log(`
📊 Created:
  - ${await prisma.user.count()} users
  - ${await prisma.tag.count()} tags  
  - ${await prisma.project.count()} projects
  - ${await prisma.artifact.count()} artifacts
  - ${await prisma.projectArtifact.count()} project-artifact relationships
  - ${await prisma.artifactTag.count()} artifact-tag relationships
  - ${await prisma.reaction.count()} reactions
  `)
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
