const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const projects = [
  {
    id: 1,
    title: "CI/CD Pipeline",
    description: "Automated build and deploy pipeline using Cloud Build, Docker and Cloud Run with GitHub integration.",
    status: "completed",
    startDate: "May 1, 2026",
    endDate: "May 9, 2026",
    progress: 100,
    tags: ["Cloud Build", "Cloud Run", "Docker", "Node.js"],
    liveUrl: "https://my-app-sw6sdums2q-uc.a.run.app",
    repoUrl: "https://github.com/HKakshatha/my-cicd-app"
  },
  {
    id: 2,
    title: "Project Tracker App",
    description: "Personal project tracking web app deployed via CI/CD pipeline. Built using GCP Console UI.",
    status: "completed",
    startDate: "May 9, 2026",
    endDate: "May 9, 2026",
    progress: 100,
    tags: ["Cloud Run", "Artifact Registry", "GCP UI", "Node.js"],
    liveUrl: "#",
    repoUrl: "https://github.com/HKakshatha/my-cloud-projects"
  },
  {
    id: 3,
    title: "GKE Microservices",
    description: "Multi-service app on Google Kubernetes Engine with Helm charts, monitoring and auto-scaling.",
    status: "inprogress",
    startDate: "Coming soon",
    endDate: null,
    progress: 0,
    tags: ["GKE", "Helm", "Kubernetes", "Cloud Monitoring"],
    liveUrl: null,
    repoUrl: null
  },
  {
    id: 4,
    title: "Infrastructure as Code",
    description: "Complete GCP infrastructure provisioned using Terraform with remote state and reusable modules.",
    status: "inprogress",
    startDate: "Coming soon",
    endDate: null,
    progress: 0,
    tags: ["Terraform", "GCS", "IAM", "VPC"],
    liveUrl: null,
    repoUrl: null
  },
  {
    id: 5,
    title: "GitOps with ArgoCD",
    description: "GitOps deployment pipeline using ArgoCD on GKE with Workload Identity and Secret Manager.",
    status: "inprogress",
    startDate: "Coming soon",
    endDate: null,
    progress: 0,
    tags: ["ArgoCD", "GKE", "GitOps", "Secret Manager"],
    liveUrl: null,
    repoUrl: null
  }
];

app.get('/', (req, res) => {
  const total = projects.length;
  const completed = projects.filter(p => p.status === 'completed').length;
  const inprogress = projects.filter(p => p.status === 'inprogress').length;
  const allTags = [...new Set(projects.flatMap(p => p.tags))];

  const projectCards = projects.map(p => `
    <div class="card">
      <div class="card-top">
        <div class="card-title">${p.title}</div>
        <div class="status-badge ${p.status === 'completed' ? 'status-done' : 'status-wip'}">
          ${p.status === 'completed' ? 'Completed' : 'In Progress'}
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${p.progress}%;background:${p.progress === 100 ? 'linear-gradient(90deg,#a78bfa,#60a5fa)' : 'linear-gradient(90deg,#fbbf24,#fb923c)'}"></div>
      </div>
      <div class="card-desc">${p.description}</div>
      <div class="dates">
        <div class="date-item">Started: <span>${p.startDate}</span></div>
        ${p.endDate ? `<div class="date-item">Finished: <span>${p.endDate}</span></div>` : ''}
      </div>
      <div class="tags">
        ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="links">
        ${p.liveUrl ? `<a class="link-btn link-live" href="${p.liveUrl}" target="_blank">Live URL</a>` : ''}
        ${p.repoUrl ? `<a class="link-btn link-repo" href="${p.repoUrl}" target="_blank">GitHub Repo</a>` : ''}
      </div>
    </div>
  `).join('');

  const skillTags = allTags.map(tag => `<span class="skill">${tag}</span>`).join('');

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Cloud Projects</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { min-height: 100vh; background: #0d0b1e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: white; padding: 40px 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 36px; }
    .header-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.3); border-radius: 20px; padding: 5px 14px; font-size: 11px; color: #a78bfa; margin-bottom: 14px; }
    .pulse { width: 6px; height: 6px; background: #a78bfa; border-radius: 50%; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    h1 { font-size: 40px; font-weight: 700; background: linear-gradient(90deg, #a78bfa, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; }
    .subtitle { font-size: 14px; color: rgba(255,255,255,0.4); }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
    .stat { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; text-align: center; }
    .stat-n { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
    .stat-l { font-size: 11px; color: rgba(255,255,255,0.4); }
    .purple { color: #a78bfa; } .blue { color: #60a5fa; } .green { color: #34d399; } .amber { color: #fbbf24; }
    .projects { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; transition: all 0.2s; }
    .card:hover { border-color: rgba(167,139,250,0.4); transform: translateY(-3px); }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
    .card-title { font-size: 15px; font-weight: 600; }
    .status-badge { font-size: 10px; padding: 3px 10px; border-radius: 20px; font-weight: 500; white-space: nowrap; }
    .status-done { background: rgba(52,211,153,0.1); color: #34d399; border: 1px solid rgba(52,211,153,0.2); }
    .status-wip { background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.2); }
    .progress-bar { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-bottom: 12px; }
    .progress-fill { height: 100%; border-radius: 2px; }
    .card-desc { font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 12px; }
    .dates { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
    .date-item { font-size: 11px; color: rgba(255,255,255,0.35); }
    .date-item span { color: rgba(255,255,255,0.6); }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .tag { font-size: 10px; padding: 3px 10px; border-radius: 20px; background: rgba(167,139,250,0.1); color: #a78bfa; border: 1px solid rgba(167,139,250,0.2); }
    .links { display: flex; gap: 8px; flex-wrap: wrap; }
    .link-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; padding: 5px 12px; border-radius: 8px; text-decoration: none; transition: all 0.2s; }
    .link-live { background: rgba(167,139,250,0.1); color: #a78bfa; border: 1px solid rgba(167,139,250,0.2); }
    .link-repo { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.1); }
    .link-btn:hover { opacity: 0.7; }
    .skills-section { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 20px; margin-bottom: 28px; }
    .skills-title { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.5); margin-bottom: 14px; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill { font-size: 11px; padding: 4px 14px; border-radius: 20px; background: rgba(96,165,250,0.1); color: #60a5fa; border: 1px solid rgba(96,165,250,0.2); }
    .footer { text-align: center; padding: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; }
    .version { font-size: 11px; color: rgba(255,255,255,0.25); margin-bottom: 8px; }
    .live-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2); border-radius: 20px; padding: 5px 14px; font-size: 11px; color: #34d399; }
    .dot { width: 6px; height: 6px; background: #34d399; border-radius: 50%; animation: pulse 1.5s infinite; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-badge"><div class="pulse"></div> Live on Google Cloud Run</div>
      <h1>My Cloud Projects</h1>
      <p class="subtitle">Akshata's DevOps and GCP learning journey</p>
    </div>
    <div class="stats">
      <div class="stat"><div class="stat-n purple">${total}</div><div class="stat-l">Total projects</div></div>
      <div class="stat"><div class="stat-n green">${completed}</div><div class="stat-l">Completed</div></div>
      <div class="stat"><div class="stat-n amber">${inprogress}</div><div class="stat-l">In progress</div></div>
      <div class="stat"><div class="stat-n blue">${allTags.length}</div><div class="stat-l">Technologies</div></div>
    </div>
    <div class="projects">${projectCards}</div>
    <div class="skills-section">
      <div class="skills-title">Technologies and tools across all projects</div>
      <div class="skills-grid">${skillTags}</div>
    </div>
    <div class="footer">
      <div class="version">Version: ${process.env.VERSION || 'v1'} | Region: us-central1 | Platform: Google Cloud Run</div>
      <div class="live-badge"><div class="dot"></div> Live and auto-scaling</div>
    </div>
  </div>
</body>
</html>`);
});

app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
