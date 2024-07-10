import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
  X,
} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export function App() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGestModalOpen, setIsGuestModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'franciscomenezes@gmail.com',
    'teste@gmail.com',
  ])

  const [email, setEmail] = useState('')

  function onpenGuestInput() {
    setIsGuestInputOpen(true)
  }
  function closeGuestInput() {
    setIsGuestInputOpen(false)
  }

  function openGeustModal() {
    setIsGuestModalOpen(true)
  }

  function closeGeustModal() {
    setIsGuestModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email) {
      toast.error('Insira um email válido!')
      return
    }

    if (emailsToInvite.includes(email)) {
      toast.error('Email ja cadastrado!')
      return
    }

    setEmailsToInvite([...emailsToInvite, email])
    setEmail('')
  }

  function removEmailFomrInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    )
    setEmailsToInvite(newEmailList)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10 ">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                disabled={isGuestInputOpen}
                type="text"
                placeholder="Para onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 ">
              <Calendar className="size-5 " />
              <input
                disabled={isGuestInputOpen}
                type="text"
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            {!isGuestInputOpen ? (
              <button
                onClick={onpenGuestInput}
                className="bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-lime-400 duration-300"
              >
                continuar
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            ) : (
              <button
                onClick={closeGuestInput}
                className="bg-zinc-800 text-zinc-200 px-5 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-zinc-700 duration-300"
              >
                Alterar local/data
                <Settings2 className="size-5 text-zinc-200" />
              </button>
            )}
          </div>

          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-2">
              <button
                onClick={openGeustModal}
                type="button"
                className="flex items-center gap-2 flex-1 text-left"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="text-zinc-400 flex-1">
                  Quem estará na viagem?
                </span>
              </button>

              <button
                onClick={onpenGuestInput}
                className="bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-lime-400 duration-300"
              >
                confirmar viagem
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
          <br /> com nossos{' '}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGestModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button type="button" onClick={closeGeustModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email, i) => (
                <div
                  key={i}
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                >
                  <span className="text-zinc-50 text-sm">{email}</span>
                  <button
                    type="button"
                    onClick={() => removEmailFomrInvites(email)}
                  >
                    <X className="size-4 text-zinc-400" />
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-zinc-800" />
            <form
              onSubmit={addNewEmailToInvite}
              className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
            >
              <AtSign className="size-5 text-zinc-400" />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Informe o email do convidado"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-lime-400 duration-300"
              >
                convidar
                <Plus />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
